import { View } from "react-native";
import MediaAppRibbonMedia from "./MediaAppRibbonMedia";

const MediaAppRibbon = (props) => {
  const { mediaType, media, setModalVisible } = props;
  // console.log(`MediaAppRibbon media`, media);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        padding: 5,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#35ac55ff",
        height: "100%",
        borderRadius: 5,
        // borderWidth: 1,
      }}
    >
      <MediaAppRibbonMedia
        media={media}
        setModalVisible={setModalVisible}
        mediaType={mediaType}
      />
    </View>
  );
};

export default MediaAppRibbon;
