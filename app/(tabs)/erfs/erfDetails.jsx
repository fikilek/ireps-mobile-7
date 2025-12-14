import { useLocalSearchParams } from "expo-router";
import PageWrapper from "../../../components/page/PageWrapper.jsx";

import ErfDetailsData from "../../../features/erfs/ErfDetailsData.jsx";

const ErfDetails = () => {
  console.log(` `);
  console.log(` `);
  console.log(`ErfDetails ----START START running`);
  console.log(`ErfDetails ----START START running`);

  const { erf } = useLocalSearchParams();
  // console.log(`ErfDetails ----erf`, erf);

  const parsedErf = JSON.parse(erf);
  // console.log(`ErfDetails ----parsedErf`, parsedErf);

  console.log(`ErfDetails ----END END running`);
  console.log(`ErfDetails ----END END running`);
  console.log(` `);
  console.log(` `);

  return (
    <PageWrapper>
      <ErfDetailsData erf={parsedErf} />
    </PageWrapper>
  );
};

export default ErfDetails;
