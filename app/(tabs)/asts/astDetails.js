import { useLocalSearchParams } from "expo-router";
import PageWrapper from "../../../components/page/PageWrapper.jsx";

import AstDetailsData from "../../../features/asts/AstDetailsData.jsx";

const AstDetails = () => {
  const params = useLocalSearchParams();
  // console.log(`params`, params);

  const { ast, title } = params;
  // console.log(`ast`, ast);
  // console.log(`title`, title);

  const parsedAst = JSON.parse(ast);
  // console.log(`parsedAst`, parsedAst);

  return (
    <PageWrapper>
      <AstDetailsData ast={parsedAst} title={title} />
    </PageWrapper>
  );
};

export default AstDetails;
