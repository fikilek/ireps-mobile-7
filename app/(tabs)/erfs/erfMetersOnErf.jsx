import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import AstDetail from "../../../features/asts/AstDetail";

const ErfMetersOnErf = () => {
  console.log(`ErfMetersOnErf ---running`);

  const router = useRouter();
  const { erf } = useLocalSearchParams();
  // console.log(`erf`, erf);

  // console.log(`TrnFormMeterInstallation erf`, JSON.stringify(erf, null, 2));

  const { asts, erfNo, services } = JSON.parse(erf);
  // console.log(`asts`, asts);
  // console.log(`ErfMetersOnErf erfNo`, erfNo);
  const { electricity, water } = services || {};
  const { comment, supplyErfNo } = electricity || {};

  const editErfElecSupplyPoint = (trnType) => {
    // console.log(`editSupplyPoint: `, trnType);
    router.navigate({
      pathname: `/erfsDisplays/erfFormServiceConnection_`,
      params: {
        // erf: JSON.stringify(erf),
        erf: erf,
        irepsKeyItem: "erf",
        erfNo: erf?.erfNo,
        erfType: erf?.erfNo?.slice(0, 2) === "FE" ? "Fake" : "Formal",
        trnType: trnType,
      },
    });
  };

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            margin: 5,
            padding: 5,
            backgroundColor: "lightgrey",
            gap: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              backgroundColor: "grey",
              borderRadius: 5,
            }}
          >
            <MaterialIcons name="electric-bolt" size={24} color="black" />
            <Text style={{ color: "white" }}>
              Through{" "}
              <Text style={{ fontWeight: "900" }}>Erf : {supplyErfNo}</Text>
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
                backgroundColor: "grey",
              }}
            >
              <FontAwesome5
                onPress={() => editErfElecSupplyPoint("elecSc")}
                name="edit"
                size={24}
                color="black"
              />
            </View>
          </View>
          {/* <FlatList
            data={asts}
            renderItem={({ item }) => <AstDetail ast={item} />}
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 5,
              padding: 5,
              backgroundColor: "lightgrey",
            }}
            keyExtractor={(item) => item?.astId}
            ListEmptyComponent={() => (
              <ListEmptyComponent msg="No Electricity Meter(s) Found" />
            )}
          /> */}
        </View>
        <View
          style={{
            margin: 5,
            padding: 5,
            backgroundColor: "lightgrey",
            gap: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              backgroundColor: "grey",
              borderRadius: 5,
            }}
          >
            <FontAwesome5 name="water" size={24} color="black" />
            <Text style={{ color: "white" }}>
              Through <Text style={{ fontWeight: "900" }}>Erf : {erfNo}</Text>
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
                backgroundColor: "grey",
              }}
            >
              <FontAwesome5
                onPress={() => editErfElecSupplyPoint("waterSc")}
                name="edit"
                size={24}
                color="black"
              />
            </View>
          </View>
          {/* <FlatList
            data={[]}
            renderItem={({ item }) => <AstDetail ast={item} />}
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 5,
              padding: 5,
              backgroundColor: "lightgrey",
            }}
            keyExtractor={(item) => item?.astId}
            ListEmptyComponent={() => (
              <ListEmptyComponent msg="No Water Meter(s) Found" />
            )}
          /> */}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ErfMetersOnErf;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
