import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { truncateString } from "../../utils/utilsCommon";

const TeamsTeamHeader = (props) => {
  const { title, editTeam, deleteTeam } = props;
  return (
    <View
      style={{
        paddingVertical: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "papayawhip",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 14,
          color: "blue",
        }}
      >
        {truncateString(title, 15)}
      </Text>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
        }}
      >
        {/* <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                          {members?.length} users
                        </Text> */}
        <FontAwesome name="edit" size={20} color="blue" onPress={editTeam} />
        <FontAwesome
          name="remove"
          size={20}
          color="blue"
          onPress={deleteTeam}
        />
      </View>
    </View>
  );
};

export default TeamsTeamHeader;
