import { useLocalSearchParams } from "expo-router";
import PageWrapper from "../../../components/page/PageWrapper.jsx";

import MediaApp from "../../../components/media/MediaApp.jsx";

const TrnMedia = () => {
  const params = useLocalSearchParams();
  // console.log(`TrnMedia params`, params);

  const { trn } = params;
  // console.log(`TrnMedia trn`, trn);

  const parsedTrn = JSON.parse(trn);
  // console.log(`TrnMedia parsedTrn`, parsedTrn);

  const { media } = parsedTrn || [];
  // console.log(`TrnMedia media`, media);

  return (
    <PageWrapper>
      <MediaApp
        media={media}
        trn={parsedTrn}
        erf={null}
        ast={null}
        irepsKeyItem="trn"
      />
    </PageWrapper>
  );
};

export default TrnMedia;
