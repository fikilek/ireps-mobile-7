import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import BtnAddMore from "../../components/BtnAddMore";
import { useAuth } from "../../context/authContext";
import { useStores } from "../../hooks/useStores";
import { useGetAstsBySpQuery } from "../../redux/astsSlice";
import { useGetUserByIdQuery } from "../../redux/usersSlice";
import { styles } from "../../utils/utilsGlobalStyles";
import Store from "./Store";

const Stores = () => {
  const router = useRouter();

  // Check if user has has a workbase
  const { user } = useAuth();
  // console.log(`MainLayout user`, user);

  const { uid, claims, displayName } = user || {};
  // console.log(`MainLayout claims`, claims);

  const { manager, superuser } = claims || "";

  // const { workbase } = claims || {};
  // console.log(`MainLayout workbase`, workbase);

  const { data } = useGetUserByIdQuery(uid);

  const { serviceProvider, workbases, workbase } = data || {};

  const { id: spId } = serviceProvider || {};

  const { data: asts } = useGetAstsBySpQuery({
    spId: serviceProvider?.id,
    skip: serviceProvider?.id ? true : false,
  });
  // console.log(`Stores asts?.length`, asts?.length);

  // In useStores, the query is by spId
  const { activeStores, isLoading, isError, isFetching } = useStores();
  // console.log(`activeStores`, activeStores);
  // console.log(`activeStores?.length`, activeStores?.length);

  // Get only those that are in store
  const astsInStores = asts?.filter(
    (ast) => ast?.astData?.astState?.state === "stores"
  );

  // Filter stores that the user can see. Every store has an owner.
  // The ownwer has a unique id and name.
  // The owner of the a store is either a sp or a workgase.
  // Every iREPS user to a sp.
  // The store should only be displayed if storeOwnerId is equal to user spId.
  // Allowed stores are only those that the user is allowed to see
  const allowedStores = [];
  activeStores?.forEach((store) => {
    const { owner } = store || {};
    // console.log(`owner`, owner);
    const { id: storeOwnerId } = owner || "";
    // console.log(`store owner id`, storeOwnerId);
    // console.log(`spId`, spId);

    if (storeOwnerId === spId) {
      allowedStores?.push(store);
    }
  });
  // console.log(`allowedStores`, allowedStores);

  // Group asts according to stores

  const addNewStore = () => {
    // console.log(`Add New Store`);
    router.navigate(`/admin/storesForm_`);
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
            marginBottom: 60,
            flex: 1,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "grey",
              margin: 5,
              // padding: 5,
            }}
          >
            <Text style={{ color: "white", padding: 5 }}>
              Stores | {allowedStores?.length}{" "}
            </Text>
            <Text style={{ color: "white", padding: 5 }}>
              Tot Stores Asts: {astsInStores?.length}
            </Text>

            {(manager || superuser) && (
              <BtnAddMore title={"store"} onPressHandler={addNewStore} />
            )}
          </View>
          <View
            style={{ marginBottom: 10 }}
            className="flex-1 w-screen flex-grow  "
          >
            <FlatList
              data={allowedStores}
              renderItem={({ item, index }) => (
                <Store store={item} index={++index} />
              )}
              keyExtractor={(item) => item?.id}
              initialNumToRender={10}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Stores;
