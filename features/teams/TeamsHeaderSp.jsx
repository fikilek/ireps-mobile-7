import { Text, View } from "react-native";

const TeamsHeaderSp = (props) => {
  const { title } = props;
  return (
    <View
      style={{
        backgroundColor: "grey",
        padding: 4,
        borderRadius: 5,
      }}
    >
      <Text style={{ color: "white", fontSize: 16, alignSelf: "center" }}>
        {title}
      </Text>
    </View>
  );
};

export default TeamsHeaderSp;
