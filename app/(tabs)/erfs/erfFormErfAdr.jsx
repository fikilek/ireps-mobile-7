import { useLocalSearchParams } from "expo-router";

import PageWrapper from "../../../components/page/PageWrapper.jsx";
import ErfFormAdrForm from "../../../features/erfs/ErfFormAdrForm.jsx";

const ErfFormAdr = () => {
  // console.log(`ErfFormAdr ----running`);

  const { erf } = useLocalSearchParams();
  // console.log(`ErfFormAdr ----params`, params);

  const parsedErf = JSON.parse(erf);
  // console.log(`ErfFormAdr ----parsedErf`, JSON.stringify(parsedErf, null, 2));

  return (
    <PageWrapper>
      <ErfFormAdrForm erf={parsedErf} title="Address Form" />
    </PageWrapper>
  );
};

export default ErfFormAdr;
