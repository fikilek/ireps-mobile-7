import { useLocalSearchParams } from "expo-router";

import PageWrapper from "../../../components/page/PageWrapper";
import { useAuth } from "../../../context/authContext";
import TrnFormMeterInstallation from "../../../features/trns/TrnFormMeterInstallation";
import { useTrns } from "../../../hooks/useTrns";
import { useGetUserByIdQuery } from "../../../redux/usersSlice";

const TrnFormMeterInstallation_ = () => {
  const { trnsNewFormData, trnsValidationSchema } = useTrns();
  // console.log(`TrnFormMeterInstallation_ meterData`, meterData);

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

  const meterData = trnsNewFormData["meter"]["audit"]; //Audit and installation use the same validation schema
  // console.log(`TrnFormMeterInstallation_ validationSchema`, validationSchema);

  const validationSchema = trnsValidationSchema["meter"]["audit"]; //Audit and installation use the same validation schema
  // console.log(`TrnFormMeterInstallation_ validationSchema`, validationSchema);
  // console.log(
  //   `TrnFormMeterInstallation_ validationSchema`,
  //   JSON.stringify(validationSchema, null, 2)
  // );

  // There are two possibilities with meter installation. Either the its a new installation or its an existing installation.
  // A new installation will be made of new meter installation data from useTrns accompanied by validation schema.
  // An existing meter audit will be from trns collection via trnsSlice, This would be a case of No Access trn.
  // In both cases, all 'meterData' must be prepared in this this component and sent through to the 'TrnFormMeterInstallation' ready for processing.

  let trnData = {};

  // The only data from action initiator is the erf where the ast will be installed
  const { erf, irepsKeyItem, trnType, trn } = useLocalSearchParams();
  // console.log(`TrnFormMeterInstallation_erf`, erf);
  // console.log(`TrnFormMeterInstallation_ trnType`, trnType);

  // New installation case. All installations happen on an erf hense the erf data on which new installation happens need to be used to uppdate the new installation data from useTrns.
  if (irepsKeyItem === "erf") {
    const parsedErf = JSON.parse(erf);
    // console.log(
    //   `TrnFormMeterInstallation_ parsedErf`,
    //   JSON.stringify(parsedErf, null, 2)
    // );

    const { erfNo, id, address, propertyType, prclKey } = parsedErf || {};
    // console.log(`address`, address);
    // console.log(`propertyType`, propertyType);

    const { lmMetro } = address || "";

    trnData = {
      ...meterData,
      ast: {
        ...meterData.ast,
        astData: {
          ...meterData?.ast?.astData,
          astState: {
            ...meterData?.ast?.astData?.astState,
            id: `Erf: ${erfNo}`, // This will be erfNo where the meter is installed
            name: lmMetro, // This will be LM name where the erf is
          },
        },
        astSp: {
          id: serviceProvider?.id || "",
          name: serviceProvider?.name || "",
        },
        erf: {
          ...meterData.ast.erf,
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
      },
    };
  }

  if (irepsKeyItem === "trn") {
    // This is a No Access Meter Installation transaction. No processing needed in this case.
    // No Access 'meterData' just need to go through to 'TrnFormMeterInstallation'
    trnData = JSON.parse(trn);
  }
  // console.log(
  //   `TrnFormMeterInstallation_ trnData`,
  //   JSON.stringify(trnData, null, 2)
  // );

  return (
    <PageWrapper>
      <TrnFormMeterInstallation
        trnData={trnData}
        validationSchema={validationSchema}
      />
    </PageWrapper>
  );
};

export default TrnFormMeterInstallation_;
