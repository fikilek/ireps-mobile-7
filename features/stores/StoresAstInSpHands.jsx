import {
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, Text, View } from "react-native";
import { useAuth } from "../../context/authContext";
import { useGetStoresByOwnerIdQuery } from "../../redux/storesSlice";
import { useGetUserByIdQuery } from "../../redux/usersSlice";
import { irepsDictionary, truncateString } from "../../utils/utilsCommon";

const StoresAstInSpHands = (props) => {
  const { ast, index } = props;

  const { user } = useAuth();
  // console.log(`user`, user);

  const { uid, displayName } = user || {};
  // console.log(`uid`, uid);

  // Get user data from users collectin. From this data we will need user sp data. All users belong to a sp.
  const { data } = useGetUserByIdQuery(uid);
  // console.log(`data`, data);

  const {
    serviceProvider: { id: userSpId, name: userSpName },
  } = data || {};

  // Ger all stores owned by the user sp
  const {
    data: spStores,
    isError,
    isFetching,
    isLoading,
  } = useGetStoresByOwnerIdQuery({ spId: userSpId });
  // console.log(`spStores?.length`, spStores?.length);
  // console.log(`userSpName`, userSpName);

  const {
    astData: {
      astNo,
      astManufacturer,
      astName,
      astState: { name: stateName, state, id: stateId },
      erf: erfNo,
    },
    astSp: { id: astSpId, name: astSpName },
  } = ast;
  // console.log(`StoresAstInSpHands **********************`);
  // console.log(`StoresAstInSpHands **********************`);
  // console.log(`StoresAstInSpHands **********************`);
  // console.log(`StoresAstInSpHands astNo:`, astNo);
  // console.log(`StoresAstInSpHands stateName:`, stateName);
  // console.log(`StoresAstInSpHands storeId:`, storeId);
  // console.log(`StoresAstInSpHands ast state:`, state);
  // console.log(`StoresAstInSpHands ast astSpName:`, astSpName);
  // console.log(`StoresAstInSpHands ast userSpName:`, userSpName);

  const router = useRouter();

  const openCheckOutInit = () => {
    // check if user sp is the same as ast sp. If not, return after an alert
    if (astSpId !== userSpId) {
      // console.log(
      //   `Ast Sp name [${astSpName}] is not the same as User Sp name [${userSpName}]`
      // );
      Alert.alert(
        "CheckOut Error",
        `Ast Sp name [${astSpName}] is not the same as User Sp name [${userSpName}]. Can OLNY checkout OWN asts from OWN Sp store.`
      );
      return;
    }

    // Check if the ast is in 'stores' state. checkoutInit should only happen if the ast is in the 'stores' state
    if (state !== "stores") {
      // console.log(`ast [${ast?.astData?.astNo}] NOT in stores`);
      Alert.alert(
        "CheckOut Error",
        `ast [${ast?.astData?.astNo}] NOT in stores. Action NOT allowed`
      );
      return;
    }

    console.log(`checkOutInit for ast: `, ast?.astData?.astNo);
    router.navigate({
      pathname: `/trnsDisplays/trnFormMeterCheckOutInit_`,
      params: {
        ast: JSON.stringify(ast),
        irepsKeyItem: "ast",
        erfNo: erfNo || null,
        erfType: ast?.erf?.erfNo?.slice(0, 2) === "FE" ? "Fake" : "Formal",
        trnType: "checkOutInit",
      },
    });
  };

  const openCheckOutConfirm = () => {
    // check if user sp is the same as astData.astState.spId If not, return after an alert
    if (ast?.astData?.astState?.id !== userSpId) {
      // console.log(`Ast [${ast?.astData?.astNo}] checkedOut to [${userSpName}]`);
      Alert.alert(
        "Mismatch Error",
        `Ast [${ast?.astData?.astNo}] checkedOut to [${stateName}]. Signedin user belongs to sp [${userSpName}]`
      );
      return;
    }

    // Check if the ast is in 'checkOutPending' state. checkoutConfirm should only haappen if the ast is in the 'checkOutPending' state
    if (state !== "checkOutPending") {
      // console.log(`ast [${ast?.astData?.astNo}] NOT in checkOutPending`);
      Alert.alert(
        `ast [${ast?.astData?.astNo}] NOT in checkOutPending`,
        `Action NOT allowed`
      );
      return;
    }

    console.log(`checkOutConfirm for ast: `, ast?.astData?.astNo);
    router.navigate({
      pathname: `/trnsDisplays/trnFormMeterCheckOutConfirm_`,
      params: {
        ast: JSON.stringify(ast),
        irepsKeyItem: "ast",
        erfNo: erfNo || null,
        erfType: ast?.erf?.erfNo?.slice(0, 2) === "FE" ? "Fake" : "Formal",
        trnType: "checkOutConfirm",
      },
    });
  };

  const openCheckIn = () => {
    // check if user sp is a store owner. If not, return after an alert

    if (!spStores || spStores?.length < 1) {
      console.log(`The user Sp [${displayName}] does not have a store`);
      Alert.alert(
        "CheckIn Error",
        `The user [${displayName}] of [${userSpName}] sp does not have a store.`
      );
      return;
    }

    console.log(`checkIn for ast: `, ast?.astData?.astNo);
    router.navigate({
      pathname: `/trnsDisplays/trnFormMeterCheckIn_`,
      params: {
        ast: JSON.stringify(ast),
        spStores: JSON.stringify(spStores),
        irepsKeyItem: "ast",
        erfNo: erfNo || null,
        erfType: ast?.erf?.erfNo?.slice(0, 2) === "FE" ? "Fake" : "Formal",
        trnType: "checkIn",
      },
    });
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        backgroundColor: "lightgrey",
        marginVertical: 1,
        marginHorizontal: 5,
      }}
      key={ast?.id}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          paddingVertical: 1,
          paddingHorizontal: 5,
        }}
      >
        <View style={{ width: 10 }}>
          <Text style={{ fontSize: 9 }}>{index}</Text>
        </View>
        <View style={{ width: 67 }}>
          <Text style={{ fontSize: 11 }}>{astNo}</Text>
        </View>

        {/* <View style={{ width: 40 }}>
          <Text style={{ fontSize: 11 }}>{astManufacturer}</Text>
        </View> */}

        {/*
        <View style={{ width: 40 }}>
          <Text style={{ fontSize: 11 }}>{astName}</Text>
        </View> */}
        <View style={{ width: 40 }}>
          <Text style={{ fontSize: 11 }}>
            {truncateString(irepsDictionary.get(state), 7)}
          </Text>
        </View>

        <View style={{}}>
          <Text style={{ fontSize: 11 }}>{truncateString(stateName, 15)}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 2,
          paddingVertical: 3,
          paddingHorizontal: 5,
        }}
      >
        {/* {spId === storeOwnerId && ( */}
        {state === "stores" && (
          <Feather
            name="truck"
            size={12}
            color={"indigo"}
            onPress={() => openCheckOutInit(ast)}
            style={{
              padding: 3,
              borderWidth: 2,
              borderColor: "indigo",
            }}
          />
        )}
        {state === "checkOutPending" && (
          <FontAwesome5
            name="truck"
            size={12}
            color={"orange"}
            onPress={() => openCheckOutConfirm(ast)}
            style={{
              padding: 3,
              borderWidth: 2,
              borderColor: "orange",
            }}
          />
        )}
        {state === "checkedOut" && (
          <FontAwesome
            name="truck"
            size={12}
            color={"black"}
            onPress={() => openCheckIn(ast)}
            style={{
              padding: 3,
              borderWidth: 2,
              borderColor: "bkack",
            }}
          />
        )}

        {state === "stores" ? (
          <MaterialIcons
            name="edit"
            size={12}
            color="indigo"
            // onPress={() => openGrvForm(ast)}
            style={{ padding: 3, borderWidth: 2 }}
          />
        ) : (
          <MaterialIcons
            name="edit"
            size={12}
            color="grey"
            style={{ padding: 3, borderWidth: 2, borderColor: "grey" }}
          />
        )}

        {state === "stores" ? (
          <MaterialIcons
            name="delete"
            size={12}
            color="indigo"
            // onPress={deleteGrvForm}
            style={{ padding: 3, borderWidth: 2 }}
          />
        ) : (
          <MaterialIcons
            name="delete"
            size={12}
            color="grey"
            style={{ padding: 3, borderWidth: 2, borderColor: "grey" }}
          />
        )}

        {/* )} */}
      </View>
    </View>
  );
};

export default StoresAstInSpHands;
