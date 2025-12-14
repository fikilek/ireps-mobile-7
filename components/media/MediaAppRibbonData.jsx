import { Text, View } from "react-native";

const MediaAppRibbonData = (props) => {
  const { icon, mediaType, media, fontSize = 20 } = props;

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        width: 50,
        backgroundColor: "#5f5293ff",
        borderRadius: 5,
        // padding: 5,
        // marginLeft: 2,
        // marginRight: 2,
      }}
    >
      {icon}
      <Text style={{ fontSize: fontSize }}>
        {media?.length ? media?.length : 0}
      </Text>
    </View>
  );
};

export default MediaAppRibbonData;
