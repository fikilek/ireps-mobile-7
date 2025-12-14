import { useLocalSearchParams } from "expo-router";

import PageWrapper from "../../../components/page/PageWrapper";
import { useAuth } from "../../../context/authContext";
import TrnFormGrv from "../../../features/trns/TrnFormGrv";
import { useTrns } from "../../../hooks/useTrns";
import { useGetUserByIdQuery } from "../../../redux/usersSlice";

const TrnFormGrv_ = () => {
  console.log(`TrnFormGrv_ running`);
  const { user } = useAuth();
  // console.log(`user`, user);

  const { uid, claims } = user || {};
  // console.log(`uid`, uid);
  // console.log(`useTrns claims`, claims);

  const { workbase } = claims || {};
  // console.log(`useTrns workbase`, workbase);

  const { data } = useGetUserByIdQuery(uid);
  // console.log(`data`, data);

  const { serviceProvider } = data || {};
  // console.log(`serviceProvider`, serviceProvider);

  const { trnsNewFormData, trnsValidationSchema } = useTrns();
  // console.log(`TrnFormGrv_ trnsNewFormData`, trnsNewFormData);

  const validationSchema = trnsValidationSchema["meter"]["grv"];
  // console.log(`TrnFormGrv_ validationSchema`, validationSchema);

  // There are two possibilities with meter grv. Either the its a new grv or its an existing grv.
  // A new grv will be made of new meter grv data from useTrns accompanied by validation schema.
  // An existing meter grv will be from trns collection via trnsSlice, This would be a case when a user wants to edit grv trn.
  // In both cases, all 'meterData' must be prepared in this this component as sent through to the 'TrnFormGrv' ready for processing.

  const params = useLocalSearchParams();
  console.log(`TrnFormGrv_ ----params`, params);

  const { trn, irepsKeyItem, erfNo, erfType, trnType, newAst, storeData } =
    params;
  // console.log(`astData`, astData);
  // const parsedNewAst = JSON.parse(newAst);
  // console.log(`parsedNewAst`, parsedNewAst);
  // console.log(`typeof parsedNewAst`, typeof parsedNewAst);

  let trnData = {};

  if (irepsKeyItem === "ast") {
    // This is a New Meter Grv transaction.
    // New 'meterData' from useTrns does not have the erf or more specifically lmMetro data.
    // The requirement in this processing step is to add 'imMetro' data onto the new 'meterData'.
    const parsedStoreData = JSON.parse(storeData);
    // console.log(`parsedStoreData`, parsedStoreData);
    const { id: storeId, storeName } = parsedStoreData || {};

    const trnGrvNewData = trnsNewFormData["meter"]["grv"];
    // console.log(`TrnFormMeterAudit_ trnGrvNewData`, trnGrvNewData);

    trnData = {
      ...trnGrvNewData,
      ast: {
        ...trnGrvNewData.ast,
        astData: {
          ...trnGrvNewData?.ast?.astData,
          astState: {
            ...trnGrvNewData?.ast?.astData?.astState,
            id: storeId,
            name: storeName,
          },
        },
        astSp: {
          id: serviceProvider?.id || "",
          name: serviceProvider?.name || "",
        },
        erf: {
          ...trnGrvNewData?.ast?.erf,
          address: {
            ...trnGrvNewData?.ast?.erf?.address,
            lmMetro: workbase,
          },
        },
      },
    };
  }

  if (irepsKeyItem === "trn") {
    // This is a new No Access Meter audit transaction. No processing needed in this case.
    // No Access 'meterData' just need to go through to 'TrnFormMeterAudit'
    trnData = JSON.parse(trn);
  }
  // console.log(`trnData`, trnData);
  // console.log(`TrnFormGrv_ trnData`, JSON.stringify(trnData, null, 2));

  return (
    <PageWrapper>
      <TrnFormGrv meterData={trnData} validationSchema={validationSchema} />
    </PageWrapper>
  );
};

export default TrnFormGrv_;
