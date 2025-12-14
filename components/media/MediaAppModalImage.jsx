import { Image, View } from "react-native";
import { blurhash } from "../../utils/utilsCommon";

const MediaAppModalImage = (props) => {
  const { url: thumbnail } = props;
  // console.log(
  //   `MediaAppModalImage url ++++++++++++++++++++++++++++++++++++++++++`,
  //   thumbnail
  // );

  let finalUrl = "";
  let imageOrigin = "";
  if (thumbnail) {
    // split the image downloadUrl at "o/"
    const lastPart = thumbnail?.split("o/")[1]?.replace(/\//g, "%2F");
    // console.log(`MediaAppThumbnail lastPart`, lastPart);
    finalUrl = `https://firebasestorage.googleapis.com/v0/b/ireps2.appspot.com/o/${lastPart}`;
    // console.log(`We showing url`);
    imageOrigin = "url";
  } else {
    // console.log(`We showing uri`);
    finalUrl = thumbnail;
    imageOrigin = "uri";
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "grey",
      }}
    >
      <Image
        style={{
          height: "100%",
          aspectRatio: 1,
          borderRadius: 5,
        }}
        source={{ uri: finalUrl }}
        placeholder={{ blurhash }}
        resizeMode="contain"
        transition={1000}
      />
    </View>
  );
};

export default MediaAppModalImage;
