import { useLocalSearchParams } from "expo-router";

import PageWrapper from "../../../components/page/PageWrapper";
import ErfPropertyTypeForm from "../../../features/erfs/ErfPropertyTypeForm";

const ErfFormPropertyType = () => {
  console.log(`ErfFormPropertyType ----running`);

  const { erf } = useLocalSearchParams();
  console.log(`ErfFormPropertyType ----erf`, erf);

  const parsedErf = JSON.parse(erf);
  console.log(`ErfFormPropertyType ---parsedErf`, parsedErf);

  return (
    <PageWrapper>
      <ErfPropertyTypeForm erf={parsedErf} title="Property Type Form" />
    </PageWrapper>
  );
};

export default ErfFormPropertyType;
