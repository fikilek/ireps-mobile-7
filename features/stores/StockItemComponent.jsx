import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import StoreStockItem from "./StoreStockItem";

const StockItemComponent = (props) => {
  const { label, value, stockList } = props;
  // console.log(`label`, label);
  // console.log(`value`, value);

  const onPress = () => {
    stockList(label);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <StoreStockItem title={label} data={value} />
      <MaterialIcons
        name="edit"
        size={30}
        color="indigo"
        onPress={onPress}
        style={{ padding: 3, borderWidth: 1 }}
      />
    </View>
  );
};

export default StockItemComponent;
