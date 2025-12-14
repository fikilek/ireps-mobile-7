import { useLocalSearchParams } from "expo-router";
import MediaApp from "../../../components/media/MediaApp";
import PageWrapper from "../../../components/page/PageWrapper";

const AstMedia = () => {
  const params = useLocalSearchParams();
  // console.log(`params`, params);

  const { ast } = params;
  // console.log(`erf`, erf);

  const parsedAst = JSON.parse(ast);
  // console.log(`parsedAst`, parsedAst);

  const { media } = parsedAst || [];
  // console.log(`media`, media);

  return (
    <PageWrapper>
      <MediaApp
        media={media}
        erf={null}
        trn={null}
        ast={parsedAst}
        irepsKeyItem="ast"
      />
    </PageWrapper>
  );
};

export default AstMedia;
