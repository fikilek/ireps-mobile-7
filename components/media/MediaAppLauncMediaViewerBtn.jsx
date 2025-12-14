import { Pressable, Text } from "react-native";
import { useMediaContext } from "../../context/MediaContext";
import { useMedia } from "../../hooks/useMedia";

const MediaAppLaunchMediaViewerBtn = (props) => {
  const { icon, mediaType, mediaCat, media, fontSize = 20 } = props;
  // console.log(`MediaAppLaunchMediaViewerBtn mediaType`, mediaType);
  // console.log(`MediaAppLaunchMediaViewerBtn mediaCat`, mediaCat);
  // console.log(`MediaAppLaunchMediaViewerBtn media`, media);

  // Filter out all media of same  mediaCat
  const mediaCatData =
    media && media?.filter((media) => media?.mediaCategory === mediaCat);
  // console.log(`MediaAppLaunchMediaViewerBtn mediaCatData`, mediaCatData);
  // console.log(
  //   `MediaAppLaunchMediaViewerBtn mediaCatData?.length`,
  //   mediaCatData?.length
  // );

  const { splitAndSortMedia } = useMedia();
  const { photos, audios, videos } = splitAndSortMedia(media);
  // console.log(`MediaAppLaunchMediaViewerBtn photos?.length`, photos?.length);

  // let totMedia = 0;
  // if (mediaCatData?.length) {
  //   totMedia = media?.length;
  //   console.log(`MediaAppLaunchMediaViewerBtn totMedia`, totMedia);
  // }

  const { updateMediaData } = useMediaContext();

  const handleOpenMediaViewer = (mediaCat) => {
    // console.log(`Open MediaViewer mediaCat:`, mediaCat);
    updateMediaData({
      modalMediaViewer: true, // Open mediaAppviewer modal
      modalMediaCapture: false, // close mediaAppCapture modal
      mediaCat: mediaCat,
      photos,
      audios,
      videos,
    });
  };

  return (
    <Pressable
      onPress={() => handleOpenMediaViewer(mediaCat)}
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        width: 60,
        backgroundColor: "#999999ff",
        borderRadius: 5,
        padding: 10,
        // marginLeft: 2,
        // marginRight: 2,
      }}
    >
      {icon}
      <Text style={{ fontSize: fontSize, color: "white" }}>
        {mediaCatData?.length}
      </Text>
    </Pressable>
  );
};

export default MediaAppLaunchMediaViewerBtn;
