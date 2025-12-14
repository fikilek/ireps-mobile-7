import { View } from "react-native";
import MediaAppLauncMediaCuptureBtn from "./MediaAppLauncMediaCuptureBtn";
import MediaAppRibbon from "./MediaAppRibbon";
import MediaAppRibbonData from "./MediaAppRibbonData";

const MediaAppContent = (props) => {
  const { icon, mediaType, media, setModalVisible, origin } = props;
  // console.log(`MediaAppContent origin`, origin);
  // console.log(`MediaAppContent media - ${mediaType}`, media);

  return (
    <View
      style={{
        height: 120,
        // width: "100%",
        // marginBottom: 5,
        gap: 5,
        // padding: 10,
        backgroundColor: "transparent",
        flexDirection: "row",
      }}
    >
      {origin === "form" && (
        <MediaAppLauncMediaCuptureBtn
          icon={icon}
          mediaType={mediaType}
          media={media}
          fontSize={15}
        />
      )}
      {(origin === "ast" || origin === "erf" || origin === "trn") && (
        <MediaAppRibbonData icon={icon} mediaType={mediaType} media={media} />
      )}

      <MediaAppRibbon
        mediaType={mediaType}
        media={media}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default MediaAppContent;
