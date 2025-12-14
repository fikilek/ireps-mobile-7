import { Octicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const TeamsHeaderTeams = (props) => {
  const { title, onPress } = props;
  return (
    <View
      style={{
        backgroundColor: "grey",
        padding: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        gap: 5,
      }}
    >
      <Text style={{ color: "white", fontSize: 16 }}>{title}</Text>
      <Octicons
        name="diff-added"
        size={20}
        color="black"
        style={{ color: "white" }}
        onPress={onPress}
      />
    </View>
  );
};

export default TeamsHeaderTeams;
