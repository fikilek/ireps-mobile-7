import { AntDesign, FontAwesome, Octicons } from "@expo/vector-icons";
import { View } from "react-native";
import MediaAppTypeBtn from "./MediaAppTypeBtn.jsx"; // Make sure the path is correct

const MediaAppHeader = (props) => {
  const { setMode, mode } = props;
  const iconPhoto = <AntDesign name="camera" size={30} color="black" />;
  const iconAudio = <FontAwesome name="microphone" size={30} color="black" />;
  const iconVideo = <Octicons name="video" size={30} color="black" />;
  return (
    <View
      style={{
        height: 80,
        paddingLeft: 5,
        paddingRight: 5,
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
      }}
      // className="flex-row justify-between items-center border-t bg-zinc-200"
    >
      <MediaAppTypeBtn
        label={"photo"}
        icon={iconPhoto}
        setMode={setMode}
        mode={mode}
      />
      <MediaAppTypeBtn
        label={"audio"}
        icon={iconAudio}
        setMode={setMode}
        mode={mode}
      />
      <MediaAppTypeBtn
        label={"video"}
        icon={iconVideo}
        setMode={setMode}
        mode={mode}
      />
    </View>
  );
};

export default MediaAppHeader;
