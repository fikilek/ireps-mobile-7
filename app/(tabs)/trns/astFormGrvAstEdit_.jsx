import { useLocalSearchParams } from "expo-router";
import PageWrapper from "../../../components/page/PageWrapper";
import AstFormGrvAstEdit from "../../../features/asts/AstFormGrvAstEdit";
import { useTrns } from "../../../hooks/useTrns";

const AstFormGrvAstEdit_ = () => {
  const { trnsValidationSchema } = useTrns();
  // console.log(`AstFormGrvAstEdit_ meterData`, meterData);

  const validationSchema = trnsValidationSchema["meter"]["grv"];
  // console.log(`AstFormGrvAstEdit_ validationSchema`, validationSchema);

  const params = useLocalSearchParams();
  // console.log(`AstFormGrvAstEdit_params`, params);

  const { astData } = params;
  // console.log(`AstFormGrvAstEdit_ astData`, astData);

  const trnData = JSON.parse(astData);
  // console.log(`trnData`, trnData);
  // console.log(`AstFormGrvAstEdit_ trnData`, JSON.stringify(trnData, null, 2));

  return (
    <PageWrapper>
      <AstFormGrvAstEdit
        meterData={trnData}
        validationSchema={validationSchema}
      />
    </PageWrapper>
  );
};

export default AstFormGrvAstEdit_;
