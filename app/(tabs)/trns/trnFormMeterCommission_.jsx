import { useLocalSearchParams } from "expo-router";
import { Timestamp } from "firebase/firestore";
import PageWrapper from "../../../components/page/PageWrapper";
import { useAuth } from "../../../context/authContext";
import TrnFormMeterCommission from "../../../features/trns/TrnFormMeterCommission";
import { useTrns } from "../../../hooks/useTrns";
import { useGetUserByIdQuery } from "../../../redux/usersSlice";

const TrnFormMeterCommission_ = () => {
  console.log(` `);
  console.log(` `);
  console.log(`TrnFormMeterCommission_ ----START START running`);
  console.log(`TrnFormMeterCommission_ ----START START running`);

  const { trnsValidationSchema } = useTrns();
  // console.log(
  //   `TrnFormMeterCommission_ ----trnsValidationSchema`,
  //   trnsValidationSchema
  // );

  const validationSchema = trnsValidationSchema["meter"]["commission"];
  // console.log(`TrnFormMeterCommission_ ----validationSchema`, validationSchema);

  const { user } = useAuth();
  // console.log(`TrnFormMeterCommission_ ----user`, user);

  const { uid, displayName } = user || {};
  // console.log(`TrnFormMeterCommission_ ----uid`, uid);

  const { data } = useGetUserByIdQuery(uid);
  // console.log(`TrnFormMeterCommission_ ----data`, data);

  const {
    serviceProvider: { id: spId, name: spName },
  } = data || {};
  // console.log(`TrnFormMeterCommission_ ----spId`, spId);
  // console.log(`TrnFormMeterCommission_ ----spName`, spName);

  const { params } = useLocalSearchParams(); //Either ast or trn
  console.log(`TrnFormMeterCommission_ ----params`, params);

  if (!params) {
    console.log(`TrnFormMeterCommission_ ----There is no params- return`);
    return;
  }

  const { ast, trn, irepsKeyItem, erfNo, rtfType, trnType, title } = params;
  // console.log(`TrnFormMeterCommission_ ----ast`, ast);
  // console.log(`TrnFormMeterCommission_ ----irepsKeyItem`, irepsKeyItem);

  let trnData = {};

  if (irepsKeyItem === "ast") {
    // This is a New Meter Commissioning transaction. It uses xisting ast ast from the field (from asts collection)

    const parsedAst = JSON.parse(ast);
    // console.log(`parsedAst`, parsedAst);
    // console.log(
    //   `TrnFormMeterCheckOutConfirm parsedAst`,
    //   JSON.stringify(parsedAst, null, 2)
    // );
    const timestamp = Timestamp.now();

    // Generate trn data
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
            state: "connected",
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
      },
    };
  }

  if (irepsKeyItem === "trn") {
    // This is a new No Access Meter audit transaction. No processing needed in this case.
    // No Access 'meterData' just need to go through to 'TrnFormMeterAudit'
    trnData = JSON.parse(trn);
  }

  console.log(`TrnFormMeterCommission_ ----END END`);
  console.log(`TrnFormMeterCommission_ ----END END`);
  console.log(` `);
  console.log(` `);

  return (
    <PageWrapper>
      <TrnFormMeterCommission
        meterData={trnData}
        validationSchema={validationSchema}
      />
    </PageWrapper>
  );
};

export default TrnFormMeterCommission_;
