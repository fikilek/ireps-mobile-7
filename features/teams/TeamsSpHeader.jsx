import { Text, View } from "react-native";

const TeamsSpHeader = (props) => {
  const { title } = props;
  return (
    <View
      style={{
        borderBottomWidth: 0,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 4,
        // backgroundColor: "papayawhip",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 14 }}>{title}</Text>
    </View>
  );
};

export default TeamsSpHeader;
