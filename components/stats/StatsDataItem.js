import { Text, View } from "react-native";

const StatsDataItem = (props) => {
  const { item } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 5,
        padding: 2,
        borderBottomWidth: 1,
      }}
    >
      <Text>{item?.key}</Text>
      <Text>{` - `}</Text>
      <Text>{item?.value}</Text>
    </View>
  );
};

export default StatsDataItem;
