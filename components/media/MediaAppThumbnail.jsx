import { Image, Pressable, Text, View } from "react-native";
// import { useImage, Image } from "expo-image";
import {
  blurhash,
  camelCaseToWords,
  truncateString,
} from "../../utils/utilsCommon";

const MediaAppThumbnail = (props) => {
  const { thumbnail, setModalVisible, index, mediaType, mediaCategory } = props;
  // console.log(`MediaAppThumbnail thumbnail`, thumbnail);
  // console.log(
  //   `MediaAppRibbonMedia media - ${mediaType}`,
  //   JSON.stringify(media, null, 2)
  // );
  // console.log(`MediaAppThumbnail thumbnail.url`);
  // console.log(`MediaAppThumbnail mediaCategory`, mediaCategory);

  let finalUrl = "";
  let imageOrigin = "";
  if (thumbnail?.downloadUrl) {
    // split the image downloadUrl at "o/"
    const lastPart = thumbnail.downloadUrl
      ?.split("o/")[1]
      ?.replace(/\//g, "%2F");
    // console.log(`MediaAppThumbnail splitUrl`, splitUrl);

    // construct the final url
    finalUrl = `https://firebasestorage.googleapis.com/v0/b/ireps2.appspot.com/o/${lastPart}`;
    // console.log(`We showing url`);
    imageOrigin = "url";
  } else {
    // console.log(`We showing uri`);
    finalUrl = thumbnail?.uri;
    imageOrigin = "uri";
  }

  const handleShowMedia = () => {
    // console.log(
    //   `MediaAppThumbnail handleShowMedia &&&&&&&&&&&&&&&&&&&&&&&&&&&&&`,
    //   finalUrl
    // );
    setModalVisible((prev) => {
      // console.log(`Opening image modal`);
      return {
        // ...prev,
        visible: true,
        index: index,
        mediaType: mediaType,
      };
    });
  };

  return (
    <View
      style={{
        flex: 1,
        marginRight: 5,
        height: "100%",
        width: "100%",
      }}
    >
      <Pressable onPress={handleShowMedia} style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 12,
            backgroundColor: "white",
            borderRadius: 3,
            fontWeight: imageOrigin === "uri" ? "bold" : "auto",
            color: imageOrigin === "uri" ? "grey" : "blue",
          }}
        >
          {truncateString(camelCaseToWords(mediaCategory), 12)}
        </Text>
        <Image
          style={{
            width: "85",
            height: "100%",
            // aspectRatio: 1,
            borderRadius: 5,
          }}
          source={{ uri: finalUrl }}
          placeholder={{ blurhash }}
          contentFit="cover"
          // resizeMode="contain"
          transition={1000}
        />
      </Pressable>
    </View>
  );
};

export default MediaAppThumbnail;
