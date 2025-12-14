import { useLocalSearchParams } from "expo-router";
import { Timestamp } from "firebase/firestore";
import PageWrapper from "../../../components/page/PageWrapper";
import { useAuth } from "../../../context/authContext";
import TrnFormMeterCheckOutConfirm from "../../../features/trns/TrnFormMeterCheckOutConfirm";
import { useTrns } from "../../../hooks/useTrns";
import { useGetUserByIdQuery } from "../../../redux/usersSlice";

const TrnFormMeterCheckOutConfirm_ = () => {
  const { trnsValidationSchema } = useTrns();

  const validationSchema = trnsValidationSchema["meter"]["checkOutConfirm"];
  // console.log(`TrnFormMeterInspection validationSchema`, validationSchema);

  const { user } = useAuth();
  // console.log(`user`, user);

  const { uid, displayName } = user || {};
  // console.log(`uid`, uid);

  const { data } = useGetUserByIdQuery(uid);
  // console.log(`TrnFormMeterCheckOutConfirm_ data`, data);

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

    // Generate trn data
    trnData = {
      ast: parsedAst,
      // ast: {
      //   ...parsedAst,
      //   astData: {
      //     ...parsedAst?.astData,
      //     astState: {
      //       ...parsedAst?.astData?.astState,
      //       //The checkOut trn data needed to be provided with sp data of the user. This is comes from 'users' collection.
      //       // id: spId,
      //       // name: spName,
      //       state: "",
      //       comment: "",
      //     },
      //   },
      // },
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

  return (
    <PageWrapper>
      <TrnFormMeterCheckOutConfirm
        meterData={trnData}
        validationSchema={validationSchema}
      />
    </PageWrapper>
  );
};

export default TrnFormMeterCheckOutConfirm_;
