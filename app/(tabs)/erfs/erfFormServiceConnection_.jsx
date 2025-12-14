import { useLocalSearchParams } from "expo-router";

import PageWrapper from "../../../components/page/PageWrapper";
import ErfFormServiceConnectionElec from "../../../features/erfs/ErfFormServiceConnectionElec";
import ErfFormServiceConnectionWater from "../../../features/erfs/ErfFormServiceConnectionWater";

const ErfFormServiceConnection_ = () => {
  console.log(`ErfFormServiceConnection_ ----running`);

  const { erf, trnType } = useLocalSearchParams();
  // console.log(`erf`, erf);
  // console.log(`ErfFormServiceConnection_ erf`, JSON.stringify(erf, null, 2));

  const parsedErf = JSON.parse(erf);
  // console.log(`parsedErf`, parsedEr

  if (trnType === "elecSc") {
    return (
      <PageWrapper>
        <ErfFormServiceConnectionElec
          erf={parsedErf}
          title="Electricity Supply Pont"
        />
      </PageWrapper>
    );
  }
  if (trnType === "waterSc") {
    return (
      <PageWrapper>
        <ErfFormServiceConnectionWater
          erf={parsedErf}
          title="Water Supply Point"
        />
      </PageWrapper>
    );
  }
};

export default ErfFormServiceConnection_;
