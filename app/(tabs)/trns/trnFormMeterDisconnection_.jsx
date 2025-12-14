import { useLocalSearchParams } from "expo-router";
import { Timestamp } from "firebase/firestore";
import uuid from "react-native-uuid";

import PageWrapper from "../../../components/page/PageWrapper";
import { useAuth } from "../../../context/authContext";
import TrnFormMeterDisconnection from "../../../features/trns/TrnFormMeterDisconnection";
import { useTrns } from "../../../hooks/useTrns";
import { useGetUserByIdQuery } from "../../../redux/usersSlice";

const TrnFormMeterDisconnection_ = () => {
  console.log(`TrnFormMeterDisconnection_ runnimng`);
  const { trnsValidationSchema } = useTrns();

  const validationSchema = trnsValidationSchema["meter"]["disconnection"];
  // console.log(`TrnFormMeterInspection validationSchema`, validationSchema);

  const { user } = useAuth();
  // console.log(`user`, user);

  const { uid, displayName } = user || {};
  // console.log(`uid`, uid);

  const { data } = useGetUserByIdQuery(uid);
  // console.log(`TrnFormMeterDisconnection_ data`, data);

  const {
    serviceProvider: { id: spId, name: spName },
  } = data || {};
  // console.log(`id`, id);
  // console.log(`name`, name);

  const { ast, trn, irepsKeyItem, erfNo, rtfType, trnType, title } =
    useLocalSearchParams(); //Either ast or trn
  // console.log(`ast`, ast);

  // const parsedAst = JSON.parse(ast);
  // console.log(`parsedAst`, JSON.stringify(parsedAst, null, 2));
  // const parsedTrn = JSON.parse(ast);
  // console.log(`parsedTrn`, JSON.stringify(parsedTrn, null, 2));
  let trnData = {};

  if (irepsKeyItem === "ast") {
    // This is a New CheckOutInit transaction. It uses data from the ast stores

    const parsedAst = JSON.parse(ast);
    // console.log(`parsedAst`, parsedAst);
    // console.log(
    //   `TrnFormMeterCheckOutConfirm parsedAst`,
    //   JSON.stringify(parsedAst, null, 2)
    // );
    const timestamp = Timestamp.now();

    // delete id from ast. Its not needed for the current trn
    delete parsedAst["id"];
    delete parsedAst["trns"];
    delete parsedAst["media"];
    delete parsedAst["vending"];

    const trnId = uuid.v4();
    trnData = {
      ast: {
        ...parsedAst,
        astData: {
          ...parsedAst?.astData,
          astState: {
            ...parsedAst?.astData?.astState,
            //The checkOut trn data needed to be provided with sp data of the user. This is comes from 'users' collection.
            // id: spId,
            // name: spName,
            state: "disconnected",
            comment: "",
          },
        },
      },
      access: {
        meterAccess: "yes", // ['yes', 'no']
        noAccessReason: "", //['', '', ''] - reuquired if access === 'no
      },
      metadata: {
        createdAtDatetime: timestamp,
        createdByUser: displayName,
        createdByUid: uid,
        updatedAtDatetime: timestamp,
        updatedByUser: displayName,
        updatedByUid: uid,
        trnState: "draft",
        trnType: trnType,
        trnId,
      },
    };
  }

  if (irepsKeyItem === "trn") {
    // This is a new No Access Meter audit transaction. No processing needed in this case.
    // No Access 'meterData' just need to go through to 'TrnFormMeterAudit'
    trnData = JSON.parse(trn);
  }

  console.log(
    `TrnFormMeterDisconnection_ trnData`,
    JSON.stringify(trnData, null, 2)
  );

  return (
    <PageWrapper>
      <TrnFormMeterDisconnection
        meterData={trnData}
        validationSchema={validationSchema}
      />
    </PageWrapper>
  );
};

export default TrnFormMeterDisconnection_;
