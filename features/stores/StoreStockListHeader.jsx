import { Text, View } from "react-native";
import BtnAddMore from "../../components/BtnAddMore";

const StoreStockListHeader = (props) => {
  const { listName, storeName, astCat, total, addNewAst, spId, storeOwnerId } =
    props;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 30,
        margin: 5,
      }}
    >
      <Text
        style={{
          borderWidth: 1,
          padding: 2,
          borderRadius: 5,
          backgroundColor: "yellow",
        }}
      >
        {listName}
      </Text>
      <Text
        style={{
          borderWidth: 1,
          padding: 2,
          borderRadius: 5,
          backgroundColor: "yellow",
        }}
      >
        {storeName}
      </Text>
      <Text
        style={{
          borderWidth: 1,
          padding: 2,
          borderRadius: 5,
          backgroundColor: "yellow",
        }}
      >
        {astCat}
      </Text>
      <Text
        style={{
          borderWidth: 1,
          padding: 2,
          borderRadius: 5,
          backgroundColor: "yellow",
        }}
      >
        Tot: {total}
      </Text>
      {spId === storeOwnerId && (
        <BtnAddMore onPressHandler={addNewAst} bottom={60} />
      )}
    </View>
  );
};

export default StoreStockListHeader;
