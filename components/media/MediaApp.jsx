import { View } from "react-native";

// import MediaAppCapture from "./MediaAppCapture";
import { useEffect } from "react";
import { useMediaContext } from "../../context/MediaContext";
import { useMedia } from "../../hooks/useMedia";
import MediaAppViewer from "./MediaAppViewer";

const MediaApp = (props) => {
  const { erf, trn, ast, irepsKeyItem } = props;
  const data = erf ? erf : trn ? trn : ast ? ast : {};
  // const { data, irepsKeyItem } = props;

  const media = data?.media || [];
  // console.log(`MediaApp media`, media);

  const { updateMediaData } = useMediaContext();
  // console.log(`MediaApp updateMediaData`, updateMediaData);

  const { splitAndSortMedia } = useMedia();
  // console.log(`MediaApp splitAndSortMedia`, splitAndSortMedia);

  const { photos, audios, videos } = splitAndSortMedia(media);
  console.log(`MediaApp photos`, JSON.stringify(photos, null, 2));

  useEffect(() => {
    updateMediaData({
      data: data, // Either erf or ast
      irepsKeyItem,
      photos,
      audios,
      videos,
    });
    // return () => setMediaData(initValue);
  }, [data]);

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "lightgrey",
        padding: 5,
      }}
    >
      <MediaAppViewer origin={irepsKeyItem} />
    </View>
  );
};

export default MediaApp;
