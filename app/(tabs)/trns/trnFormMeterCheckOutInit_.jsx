import { useLocalSearchParams } from "expo-router";
import { Timestamp } from "firebase/firestore";
import PageWrapper from "../../../components/page/PageWrapper";
import { useAuth } from "../../../context/authContext";
import TrnFormMeterCheckOutInit from "../../../features/trns/TrnFormMeterCheckOutInit";
import { useTrns } from "../../../hooks/useTrns";
import { useGetUserByIdQuery } from "../../../redux/usersSlice";

const TrnFormMeterCheckOutInit_ = () => {
  const { trnsValidationSchema } = useTrns();

  const validationSchema = trnsValidationSchema["meter"]["checkOutInit"];
  // console.log(`TrnFormMeterInspection validationSchema`, validationSchema);

  const { user } = useAuth();
  // console.log(`user`, user);

  const { uid, displayName } = user || {};
  // console.log(`uid`, uid);

  // Get user data from users collectin. From this data we will need user sp data. All users belong to a sp.
  const { data } = useGetUserByIdQuery(uid);
  // console.log(`data`, data);

  const {
    serviceProvider: { id: spId, name: spName },
  } = data || {};
  // console.log(`id`, id);
  // console.log(`name`, name);

  // Get ast data where the checkOutInit operation was initiated. It this checkOut operation was initiated from asts, we need ast involed. If it was initiated from a draft checkOutInit trn, then we need the draft trn data.
  const { ast, trn, irepsKeyItem, erfNo, rtfType, trnType, title } =
    useLocalSearchParams();
  // console.log(`ast`, ast);

  // const parsedAst = JSON.parse(ast);
  // console.log(`parsedAst`, JSON.stringify(parsedAst, null, 2));
  // const parsedTrn = JSON.parse(ast);
  // console.log(`parsedTrn`, JSON.stringify(parsedTrn, null, 2));
  let trnData = {};

  if (irepsKeyItem === "ast") {
    // This is a New CheckOutInit transaction. It uses data from the ast that is in stores

    const parsedAst = JSON.parse(ast);
    // console.log(`parsedAst`, parsedAst);
    // console.log(
    //   `TrnFormMeterCheckOutConfirm parsedAst`,
    //   JSON.stringify(parsedAst, null, 2)
    // );
    const timestamp = Timestamp.now();

    // Generate chekcOutInit trn data
    trnData = {
      ast: {
        ...parsedAst,
        astData: {
          ...parsedAst?.astData,
          astState: {
            ...parsedAst?.astData?.astState,
            //The checkOut trn data needed to be provided with sp data of the user. This is comes from 'users' collection.
            // id: "spId",
            // name: "spName",
            // state: "state",
            comment: "comment",
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
    // This is an existing drft chekcOutInit transaction. No processing needed in this case.
    // No Access 'meterData' just need to go through to 'TrnFormMeterAudit'
    trnData = JSON.parse(trn);
  }

  return (
    <PageWrapper>
      <TrnFormMeterCheckOutInit
        meterData={trnData}
        validationSchema={validationSchema}
      />
    </PageWrapper>
  );
};

export default TrnFormMeterCheckOutInit_;
