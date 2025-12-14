import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

const MediaAppModalHeader = (props) => {
  const { setModalVisible } = props;
  const onHandleDelete = () => {
    console.log(`Delete image`);

    /* To delete media, there are three steps
    Step 1: Delete at firebase storage
      The existing url string should be used to get full path to the file
      The storafe ref and file path can then be used to get reference ot the file (fileRef)
      deleteFile method on useStorage can the be used to take out the image file
      Firevase storage deleteObject can then be passed fileRef to finally selete the image 


    Step 2: Delete at mediaErfs or mediaAsts Colllection
      mediaId is available on media array element. This id is either from erfsMedia or astsMedia
      Since these are documents from a collection, rtk delete doc endpoint should be used to accomplish this
      To delete a document in either erfsMedia or astsMedia, mediaId is enough

    Step 3: Delete at erf.media or asts.media array
      erfId or astId is available form firebase storage as a part of custom metadata
      Since these are documents from a collection, rtk mutation endpoint should be used to accomplish this
      To mutate (remove a media element in the media array) an erf in erfs collection, we need erfId and mediaId
    */
  };
  return (
    <View
      style={{
        flexDirection: "row",
        // width: "100%",
        height: 60,
        backgroundColor: "white",
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: "gray",
        // borderWidth: 1,
        borderTopColor: "gray",
        borderTopWidth: 1,
        borderLeftColor: "gray",
        borderLeftWidth: 1,
        borderRightColor: "gray",
        borderRightWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        elevation: 5,
      }}
    >
      <Pressable
        style={styles.modalPressableBtn}
        onPress={() =>
          setModalVisible((prev) => {
            // console.log(`closing modal`, prev);
            // console.log(`modalVisible`, modalVisible);
            return {
              ...prev,
              visible: false,
              modalData: {
                url: "",
              },
            };
          })
        }
      >
        <AntDesign name="left" size={20} color="gray" />
      </Pressable>

      {/* <Pressable style={styles.modalPressableBtn} onPress={() => "Delete"}>
        <AntDesign
          name="delete"
          size={20}
          color="darkgrey"
          onPress={onHandleDelete}
        />
      </Pressable> */}
    </View>
  );
};

export default MediaAppModalHeader;

const styles = StyleSheet.create({
  modalPressableBtn: {
    // borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    margin: 5,
    backgroundColor: "lightgrey",
  },
});
