import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import DataDisplayComponent3 from "../../components/DataDisplayComponent3";

const TeamsTeamMember = (props) => {
  const { memberUid, memberEmailAdr, memberSp, onPress } = props;
  return (
    <View
      key={memberUid}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* team member email adr */}
      <DataDisplayComponent3
        borderBottomWidth={0}
        fontWeight="normal"
        label={""}
        data={memberEmailAdr}
        fontSize={12}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* team member service provider - every team member belong to a sp */}
        <Text style={{ fontSize: 12 }}>{memberSp}</Text>
        <MaterialIcons
          name="delete-forever"
          size={20}
          color="black"
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default TeamsTeamMember;
