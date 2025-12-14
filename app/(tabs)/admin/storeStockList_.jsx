import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import StoresList from "../../../features/stores/StoresList";

const StoreStockList_ = () => {
  const { storesData, newStore, label } = useLocalSearchParams();
  // console.log(`StoresForm_ storesData`, JSON.stringify(storesData, null, 2));

  const { store, astsInStore } = JSON.parse(storesData);
  // console.log(`StoreStockList_ store`, JSON.stringify(store, null, 2));
  // console.log(`StoreStockList_ astsInStore?.length`, astsInStore?.length);
  // console.log(`StoreStockList_ store`, store);
  // console.log(`StoreStockList_ label`, label);

  return (
    <View>
      <StoresList astsInStore={astsInStore} store={store} label={label} />
    </View>
  );
};

export default StoreStockList_;
