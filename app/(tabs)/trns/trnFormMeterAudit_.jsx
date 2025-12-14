import { useLocalSearchParams } from "expo-router";
import uuid from "react-native-uuid";

import PageWrapper from "../../../components/page/PageWrapper";
import { useAuth } from "../../../context/authContext";
import TrnFormMeterAudit from "../../../features/trns/TrnFormMeterAudit";
import { useTrns } from "../../../hooks/useTrns";
import { useGetUserByIdQuery } from "../../../redux/usersSlice";

const TrnFormMeterAudit_ = () => {
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
  // console.log(`TrnFormMeterAudit_ meterData`, meterData);

  const validationSchema = trnsValidationSchema["meter"]["audit"];
  // console.log(`TrnFormMeterAudit_ validationSchema`, validationSchema);

  // There are two possibilities with meter audit. Either the its a new audit or its an existing audit.
  // A new audit will be made of new meter audit data from useTrns accompanies by validation schema.
  // An existing meter audit will be from trns collection via trnsSlice, This would be a case of No Access trn.
  // In both cases, all 'meterData' must be prepared in this this component as sent through to the 'TrnFormMeterAudit'
  // ready for processing.

  const { erf, irepsKeyItem, trn, trnType } = useLocalSearchParams();
  // console.log(`erf`, erf);
  // console.log(`irepsKeyItem`, irepsKeyItem);

  let trnData = {};

  if (irepsKeyItem === "erf") {
    // This is a New Meter Audit transaction.
    // New 'meterData' from useTrns does not have the erf data where the audit is happening.
    // The requirement in this processing step is to add 'erf' data onto the new 'meterData'.

    const parsedErf = JSON.parse(erf);
    // console.log(`parsedErf`, parsedErf);

    const { erfNo, id, address, propertyType, prclKey } = parsedErf || {};
    // console.log(`address`, address);
    // console.log(`propertyType`, propertyType);
    const { lmMetro } = address || "";

    const meterData = trnsNewFormData["meter"]["audit"];
    // console.log(`TrnFormMeterAudit_ trnsNewFormData`, trnsNewFormData);

    const trnId = uuid.v4();
    trnData = {
      ...meterData,
      ast: {
        ...meterData?.ast,
        astData: {
          ...meterData?.ast?.astData,
          astState: {
            ...meterData?.ast?.astData?.astState,
            id: `Erf: ${erfNo}`, // This will be erfNo where the meter is installed
            name: lmMetro, // This will be LM name where the erf is
            state: "connected",
          },
        },
        astSp: {
          id: serviceProvider?.id || "",
          name: serviceProvider?.name || "",
        },

        erf: {
          ...meterData?.ast?.erf,
          erfNo,
          erfId: id,
          address,
          propertyType,
          prclKey,
        },
      },
      metadata: {
        ...meterData.metadata,
        trnType,
        trnId,
      },
    };
  }

  if (irepsKeyItem === "trn") {
    // This is a new No Access Meter audit transaction. No processing needed in this case.
    // No Access 'meterData' just need to go through to 'TrnFormMeterAudit'
    trnData = JSON.parse(trn);
  }
  // console.log(`trnData`, trnData);
  // console.log(`TrnFormMeterAudit_ trnData`, JSON.stringify(trnData, null, 2));

  return (
    <PageWrapper>
      <TrnFormMeterAudit
        meterData={trnData}
        validationSchema={validationSchema}
      />
    </PageWrapper>
  );
};

export default TrnFormMeterAudit_;
