import { Text, View } from "react-native";

const StoreStockItem = (props) => {
  // console.log(`props`, props);
  const { title, data } = props;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <Text>{title}</Text>
      <Text>{" - - "}</Text>
      <Text>{data}</Text>
    </View>
  );
};

export default StoreStockItem;
