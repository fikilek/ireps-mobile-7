import { useLocalSearchParams } from "expo-router";

import uuid from "react-native-uuid";
import PageWrapper from "../../../components/page/PageWrapper.jsx";
import TrnFormMeterInspection from "../../../features/trns/TrnFormMeterInspection.jsx";

import { useTrns } from "../../../hooks/useTrns.js";

const TrnFormMeterInspection_ = () => {
  const { trnsNewFormData, trnsValidationSchema } = useTrns();
  // console.log(`TrnFormMeterInspection meterData`, meterData);

  // Extract ONLY access
  const {
    access,
    instructions,
    metadata,
    ast: { normalisation },
  } = trnsNewFormData?.meter?.inspection;
  // console.log(`TrnFormMeterInspection_ instructions`, instructions);
  // console.log(`TrnFormMeterInspection_ normalisation`, normalisation);

  const validationSchema = trnsValidationSchema["meter"]["inspection"];
  // console.log(`TrnFormMeterInspection validationSchema`, validationSchema);

  const { ast, irepsKeyItem, title, trn } = useLocalSearchParams();
  // console.log(`ast`, ast);

  // const parsedAst = JSON.parse(ast);
  // console.log(`parsedAst`, JSON.stringify(parsedAst, null, 2));
  // const parsedTrn = JSON.parse(ast);
  // console.log(`parsedTrn`, JSON.stringify(parsedTrn, null, 2));
  let trnData = {};

  if (irepsKeyItem === "ast") {
    // This is a New Inspection transaction. It uses some data from the ast

    // New metadata is required.

    const parsedAst = JSON.parse(ast);
    // console.log(`parsedAst`, parsedAst);

    // id is for the ast
    // trns are transactions of the ast

    // delete id from ast. Its not needed for the current trn
    delete parsedAst["id"];
    delete parsedAst["trns"];
    delete parsedAst["media"];
    delete parsedAst["vending"];

    const trnId = uuid.v4();
    trnData = {
      ast: {
        ...parsedAst,
        normalisation: normalisation,
      },
      access,
      instructions: instructions,
      metadata: {
        ...metadata,
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
    `TrnFormMeterInspection_ trnData`,
    JSON.stringify(trnData, null, 2)
  );

  return (
    <PageWrapper>
      <TrnFormMeterInspection
        meterData={trnData}
        validationSchema={validationSchema}
      />
    </PageWrapper>
  );
};

export default TrnFormMeterInspection_;
