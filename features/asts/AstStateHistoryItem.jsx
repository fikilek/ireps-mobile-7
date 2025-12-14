import { AntDesign } from "@expo/vector-icons";
import { Alert, Text, View } from "react-native";

const AstStateHistoryItem = (props) => {
  const {
    historyItem: { date, user, state },
  } = props;

  const onPress = () => {
    Alert.alert("This will show the trn than caused the state");
  };
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: "lightgrey",
        gap: 2,
        padding: 5,
        alignItems: "center",
      }}
    >
      <AntDesign name="infocirlceo" size={20} color="black" onPress={onPress} />
      <Text style={{ fontSize: 13, padding: 5 }}>{date}</Text>
      <Text style={{ fontSize: 13, padding: 5 }}>{user}</Text>
      <Text style={{ fontSize: 13, padding: 5 }}>{state}</Text>
    </View>
  );
};

export default AstStateHistoryItem;
