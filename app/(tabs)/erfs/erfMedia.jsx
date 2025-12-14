import { useLocalSearchParams } from "expo-router";
import PageWrapper from "../../../components/page/PageWrapper.jsx";

import MediaApp from "../../../components/media/MediaApp";

const ErfMedia = () => {
  console.log(`ErfMedia ----running`);

  const params = useLocalSearchParams();
  // console.log(`ErfMedia ----params`, params);

  const { erf } = params;
  // console.log(`ErfMedia ----erf`, erf);

  const parsedErf = JSON.parse(erf);
  // console.log(`ErfMedia ----parsedErf`, parsedErf);
  // console.log(`ErfMedia ----parsedErf:`, JSON.stringify(parsedErf, null, 2));

  const { media } = parsedErf || [];
  // console.log(`ErfMedia ----media:`, media);

  return (
    <PageWrapper>
      <MediaApp
        media={media}
        erf={parsedErf}
        trn={null}
        ast={null}
        irepsKeyItem="erf"
      />
    </PageWrapper>
  );
};

export default ErfMedia;
