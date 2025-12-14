import { Pressable, Text } from "react-native";
import { useMediaContext } from "../../context/MediaContext";

const MediaAppLauncMediaCuptureBtn = (props) => {
  const { icon, mediaType, media, fontSize = 20 } = props;

  let totMedia = 0;
  if (media?.length) {
    totMedia = media?.length;
  }

  const {
    mediaData: { mediaCat },
    updateMediaData,
  } = useMediaContext();
  // console.log(`MediaAppLaunchMediaCuptureBtn mediaCat`, mediaCat);

  const handleOpenMediaViewer = () => {
    console.log(`Open MediaCapture`);
    updateMediaData({
      modalVisible: false,
      modalMediaCapture: true,
      mediaCat: mediaCat,
    });
  };

  return (
    <Pressable
      onPress={handleOpenMediaViewer}
      style={{
        alignItems: "center",
        justifyContent: "center",
        // gap: 5,
        width: 50,
        backgroundColor: "#cce50eff",
        borderRadius: 5,
        padding: 2,
        // marginLeft: 2,
        // marginRight: 2,
      }}
    >
      {icon}
      <Text style={{ fontSize: fontSize, color: "white" }}>{totMedia}</Text>
    </Pressable>
  );
};

export default MediaAppLauncMediaCuptureBtn;
