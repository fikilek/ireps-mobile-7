import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import TrnDetail from "../../features/trns/TrnDetail";

const ErfNoAccessTrns = () => {
  console.log(`ErfNoAccessTrns ----running`);

  const { erf } = useLocalSearchParams();
  // console.log(`erf`, erf);

  const { trns } = JSON.parse(erf);
  // console.log(`trns`, trns);

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: StatusBar.currentHeight || 0,
        }}
      >
        {/* <FlatList
          data={trns}
          renderItem={({ item }) => <TrnDetail key={item.trnId} trn={item} />}
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 5,
            padding: 5,
            backgroundColor: "lightgrey",
          }}
          keyExtractor={(item) => item?.trnId}
          ListEmptyComponent={() => <ListEmptyComponent msg="No Trns Found" />}
        /> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ErfNoAccessTrns;
