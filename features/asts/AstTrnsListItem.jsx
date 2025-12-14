import { Text, View } from "react-native";

const AstTrnsListItem = (props) => {
  const { date, user, trnType, vendingAmount } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        backgroundColor: "lightgrey",
        gap: 5,
      }}
    >
      <Text style={{ fontSize: 14 }}>{date}</Text>
      <Text style={{ fontSize: 14 }}>{user}</Text>
      <Text style={{ fontSize: 14 }}>{trnType}</Text>
      <Text style={{ fontSize: 14 }}>{vendingAmount}</Text>
    </View>
  );
};

export default AstTrnsListItem;
