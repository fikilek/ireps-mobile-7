import { AntDesign, Entypo, FontAwesome, Octicons } from "@expo/vector-icons";
import { useState } from "react";
import { View } from "react-native";
import { useMediaContext } from "../../context/MediaContext";
import MediaAppContent from "./MediaAppContent";
import MediaAppModal from "./MediaAppModal";

const initModalData = {
  visible: false,
  index: 0,
  mediaType: "",
};

const MediaAppViewer = (props) => {
  const { origin } = props;
  // console.log(`MediaAppViewer origin`, origin);

  // const formik = useFormikContext();
  // console.log(`FormikMediaBtn formik`, formik);
  // const { media } = formik?.values || [];
  // const { splitAndSortMedia } = useMedia();
  // const { photos, audios, videos } = splitAndSortMedia(media);

  const { mediaData, updateMediaData } = useMediaContext();
  // console.log(`MediaAppViewer mediaData`, JSON.stringify(mediaData, null, 2));

  const { photos, audios, videos } = mediaData;
  // console.log(`MediaAppViewer photos`, JSON.stringify(photos, null, 2));

  const [modalVisible, setModalVisible] = useState(initModalData);
  // console.log(`MediaAppViewer modalVisible`, modalVisible);

  const handleOpenMediaDevices = () => {
    // console.log(`Open media devices (camera or microphone)`);
    updateMediaData({
      modalMediaCapture: true,
      modalVisible: false,
    });
  };

  const iconPhoto =
    origin === "form" ? (
      <AntDesign
        name="camera"
        size={32}
        color="gray"
        onPress={handleOpenMediaDevices}
      />
    ) : (
      <Entypo name="images" size={25} color="gray" />
    );
  const iconVoice =
    origin === "form" ? (
      <FontAwesome
        name="microphone"
        size={32}
        color="gray"
        onPress={handleOpenMediaDevices}
      />
    ) : (
      <Entypo name="voicemail" size={25} color="gray" />
    );
  const iconVideo =
    origin === "form" ? (
      <Octicons
        name="video"
        size={32}
        color="gray"
        onPress={handleOpenMediaDevices}
      />
    ) : (
      <Octicons name="video" size={25} color="gray" />
    );

  return (
    <View style={{ gap: 5 }}>
      <MediaAppContent
        icon={iconPhoto}
        media={photos || []}
        mediaType={"photos"}
        setModalVisible={setModalVisible}
        origin={origin}
      />
      <MediaAppContent
        icon={iconVoice}
        media={audios || []}
        mediaType={"voice"}
        setModalVisible={setModalVisible}
        origin={origin}
      />
      <MediaAppContent
        icon={iconVideo}
        media={videos || []}
        mediaType={"videos"}
        setModalVisible={setModalVisible}
        origin={origin}
      />
      <MediaAppModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        mediaData={mediaData}
      />
    </View>
  );
};

export default MediaAppViewer;
