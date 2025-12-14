import { Text, View } from "react-native";
import { truncateString } from "../../utils/utilsCommon";

const TeamsSpUser = (props) => {
  const { userId, email, teamName } = props;
  return (
    <View
      key={userId}
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 2,
          backgroundColor: "beige",
          margin: 2,
        },
      ]}
    >
      <Text style={{ fontSize: 12 }}>{truncateString(email, 20)}</Text>
      <Text style={{ fontSize: 12 }}>{teamName}</Text>
    </View>
  );
};

export default TeamsSpUser;
