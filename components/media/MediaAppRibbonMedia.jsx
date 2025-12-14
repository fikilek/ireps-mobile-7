import { FlatList, View } from "react-native";
import MediaAppThumbnail from "./MediaAppThumbnail";

const MediaAppRibbonMedia = (props) => {
  const { media, setModalVisible, mediaType } = props;
  // console.log(
  //   `MediaAppRibbonMedia media - ${mediaType}`,
  //   JSON.stringify(media, null, 2)
  // );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <FlatList
        horizontal
        data={media || []}
        renderItem={({ item, index }) => {
          // console.log(`item`, item);
          // console.log(`index`, index);
          return (
            <MediaAppThumbnail
              thumbnail={item}
              setModalVisible={setModalVisible}
              mediaType={mediaType}
              index={index}
              mediaCategory={item?.mediaCategory}
              keyExtractor={(item) => item.mediaId}
            />
          );
        }}
        keyExtractor={(item) => item?.mediaId}
      />
    </View>
  );
};

export default MediaAppRibbonMedia;
