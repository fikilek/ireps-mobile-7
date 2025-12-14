import { Modal } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useMediaContext } from "../../context/MediaContext";
import { useMedia } from "../../hooks/useMedia";
import MediaAppModalHeader from "./MediaAppModalHeader";
import MediaAppModalImage from "./MediaAppModalImage";

const MediaAppModal = (props) => {
  const { modalVisible, setModalVisible } = props;
  // console.log(`MediaAppModal modalVisible--------------------`, modalVisible);
  // console.log(`MediaAppModal mediaData`, mediaData);

  const { visible, index, mediaType } = modalVisible || {};
  // console.log(`MediaAppModal mediaType`, mediaType);

  const { mediaData, updateMediaData } = useMediaContext();
  // console.log(`MediaAppViewer mediaData`, JSON.stringify(mediaData, null, 2));

  // const { photos, audios, videos } = mediaData;
  //   // console.log(`MediaAppViewer photos`, JSON.stringify(photos, null, 2));

  // const formik = useFormikContext();
  // // console.log(`FormikMediaBtn formik`, formik);
  const { media } = mediaData?.data || [];
  const { splitAndSortMedia } = useMedia();
  const splitMediaData = splitAndSortMedia(media);
  // console.log(`MediaAppModal splitMediaData`, splitMediaData);

  const selectedMedia = splitMediaData?.[mediaType]?.[index];
  // console.log(`MediaAppModal selectedMedia`, selectedMedia);
  // console.log(
  //   `MediaAppModal selectedMedia`,
  //   JSON.stringify(selectedMedia, null, 2)
  // );

  const url = selectedMedia?.downloadUrl || selectedMedia?.url;
  console.log(`url`, url);

  return (
    <SafeAreaProvider style={{ backgroundColor: "lightblue" }}>
      <SafeAreaView style={{ backgroundColor: "red" }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          // onRequestClose={() => {
          // 	Alert.alert("Modal has been closed.");
          // 	setModalVisible(!modalVisible);
          // }}
          style={{ backgroundColor: "red", flex: 1 }}
        >
          <MediaAppModalHeader
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          <MediaAppModalImage url={url} />
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default MediaAppModal;
