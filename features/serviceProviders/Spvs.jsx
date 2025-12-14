import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import BtnAddMore from "../../components/BtnAddMore";
import { useSps } from "../../hooks/useSps";
import { styles } from "../../utils/utilsGlobalStyles";
import Sp from "./Sp";

const Spvs = () => {
  const router = useRouter();

  const {
    sps,

    activeSps,
    setActiveSps,
    activeSpsName,
    setActiveSpsName,

    isLoading,
    isError,
    isFetching,
  } = useSps();
  // console.log(`activeSps`, activeSps);

  const addNewServiceProvider = () => {
    // console.log(`Add New ServiceProvider`);
    router.navigate({
      pathname: `/admin/spForm_`,
      params: {
        spData: JSON.stringify(null),
        newSp: JSON.stringify(true),
      },
    });
  };

  if (isError) {
    return (
      <View style={styles.containerCenter}>
        <Text
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          Error in fetching Trns
        </Text>
      </View>
    );
  }

  if (isFetching) {
    return (
      <View style={styles.containerCenter}>
        <ActivityIndicator size="large" style={{ paddingVertical: 20 }} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#00ffff" />
        </View>
      ) : (
        <View
          style={{
            position: "relative",
            marginBottom: 50,
            flex: 1,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "grey",
              margin: 7,
            }}
          >
            <Text style={{ color: "white", padding: 5 }}>
              Service Providers List
            </Text>
            <Text style={{ color: "white", padding: 5 }}>
              Total Sps: {activeSps?.length}
            </Text>
          </View>
          <View
            style={{ marginBottom: 10 }}
            className="flex-1 w-screen flex-grow  "
          >
            <FlatList
              data={activeSps}
              renderItem={({ item }) => <Sp sp={item} />}
              keyExtractor={(item) => item?.id}
              initialNumToRender={10}
            />
          </View>
          <BtnAddMore
            title={"Service Provider"}
            onPressHandler={addNewServiceProvider}
          />
        </View>
      )}
    </View>
  );
};

export default Spvs;
