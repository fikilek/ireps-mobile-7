import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import { useState } from "react";
import DisplayBox from "../../components/DisplayBox";
import { useAuth } from "../../context/authContext";
import { useGetAstsBySpQuery } from "../../redux/astsSlice";
import { useGetUserByIdQuery } from "../../redux/usersSlice";
import StoreStock from "./StoreStock";

// const stock = [
//   { stockName: "meters", quantity: 24 },
//   { stockName: "DCUs", quantity: 14 },
// ];

const Store = (props) => {
  // console.log(`Store props`, JSON.stringify(props, null, 2));

  const [show, setshow] = useState(true);

  const toggleView = () => {
    setshow((prev) => (prev = !show));
  };

  const { store, index } = props;

  const router = useRouter();

  const { storeName, address, owner, contacts, office, id: storeId } = store;
  // console.log(`storeName`, storeName);
  // console.log(`Store storeId`, storeId);

  // const { id: storeId } = metadata || {};

  const { user } = useAuth();

  const { uid } = user || {};
  // console.log(`uid`, uid);

  const { data } = useGetUserByIdQuery(uid);
  // console.log(`user data`, data);

  const { serviceProvider } = data || {};
  // console.log(`serviceProvider`, serviceProvider);

  const {
    data: asts,
    isLoading,
    isError,
    isFetching,
  } = useGetAstsBySpQuery({
    spId: serviceProvider?.id,
  });
  // console.log(`Store asts?.length`, asts?.length);

  const astsInStore = asts?.filter(
    (ast) => ast?.astData?.astState?.id === storeId
  );
  // console.log(`Store_ useEffect astsInStore?.length`, astsInStore?.length);

  // Group stock
  const astCatergorries = {};
  astsInStore?.forEach((ast, index) => {
    // Group by astCatergory
    const propertyTypeKey = ast?.astData?.astCatergory;
    if (!astCatergorries[propertyTypeKey]) {
      astCatergorries[propertyTypeKey] = [];
    }
    astCatergorries[propertyTypeKey].push(ast?.astData?.astCatergory);
    // console.log(`astCatergorries`, astCatergorries);
  });

  const astCatergorriesStats = {};
  Object.entries(astCatergorries).forEach(([key, value]) => {
    // console.log(`key`, key);
    astCatergorriesStats[key] = value?.length;
  });
  // console.log(`useTrnsStats astCatergorriesStats`, astCatergorriesStats);

  const astCatergorriesData = Object.entries(astCatergorriesStats).map(
    ([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        label: key,
        value: value,
      };
    }
  );

  // console.log(`astCatergorriesData`, astCatergorriesData);

  const storeStockList = (label) => {
    // console.log(`storeStockList - label`, label);
    // console.log(`View Store stock list`);
    router.navigate({
      pathname: `/admin/storeStockList_`,
      params: {
        storesData: JSON.stringify({ store, astsInStore }),
        newStore: false,
        label: label,
      },
    });
  };

  const editStore = () => {
    // console.log(`Edit store`);
    router.navigate({
      pathname: `/admin/storesForm_`,
      params: {
        storesData: JSON.stringify(store),
        newStore: JSON.stringify(false),
      },
    });
  };
  const showOnMap = () => {};
  // console.log(`storeName`, storeName);

  const { streetAdr } = address || {};
  const { strNo, strName, strType } = streetAdr || {};
  const strAdr = strNo ? `${strNo} ${strName} ${strType}` : "No Street Adr";

  return (
    <View
      style={{
        padding: 5,
        margin: 5,
        gap: 5,
        borderWidth: 1,
        position: "relative",
      }}
    >
      {/* Identity */}
      <View style={{ flexDirection: "row", gap: 2 }}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <DisplayBox title={"Store Name"} data={storeName} />
          <DisplayBox title={"Store Owner"} data={owner?.name} />
          <MaterialIcons
            name="edit"
            size={30}
            color="indigo"
            onPress={editStore}
            style={{ padding: 3, borderWidth: 1 }}
          />
          {show ? (
            <AntDesign
              name="caret-down"
              size={30}
              color="indigo"
              onPress={toggleView}
              style={{ padding: 3, borderWidth: 1 }}
            />
          ) : (
            <AntDesign
              name="caretup"
              size={30}
              color="indigo"
              onPress={toggleView}
              style={{ padding: 3, borderWidth: 1 }}
            />
          )}
        </View>
      </View>

      {/* Store Detail  */}
      <View>
        {!show && (
          <View>
            {/* Contact */}
            <View style={{ gap: 2 }}>
              <View>
                <View style={{ flexDirection: "row", gap: 2 }}>
                  <DisplayBox title={"Surname"} data={contacts?.surname} />
                  <DisplayBox title={"Name"} data={contacts?.name} />
                  <DisplayBox title={"Email Adr"} data={contacts?.emailAdr} />
                </View>
                <View style={{ flexDirection: "row", gap: 2 }}>
                  <DisplayBox title={"Cell No"} data={contacts?.cellNo} />
                  <DisplayBox
                    title={"WhatsApp No"}
                    data={contacts?.whatsAppNo}
                  />
                  <DisplayBox title={"Position"} data={contacts?.position} />
                </View>
              </View>
            </View>

            {/* Address */}
            <View style={{ gap: 2 }}>
              <View style={{ flexDirection: "row", gap: 2 }}>
                <DisplayBox title={"Municipality"} data={address?.lmMetro} />
                <DisplayBox title={"Town"} data={address?.town} />
                <DisplayBox
                  title={"Suburb/Tship"}
                  data={address?.suburbTownship}
                />
              </View>
              <View style={{ flexDirection: "row", gap: 2 }}>
                <DisplayBox title={"Street Adr"} data={strAdr} />
                <FontAwesome5
                  name="map-marked-alt"
                  size={24}
                  color="black"
                  onPress={showOnMap}
                  style={{ padding: 3, borderWidth: 1 }}
                />
              </View>
            </View>

            {/* Office */}
            <View style={{ flexDirection: "row", gap: 2 }}>
              <DisplayBox title={"Office Phone"} data={office?.phone} />
              <DisplayBox title={"Office Email"} data={office?.emailAdr} />
            </View>
          </View>
        )}
      </View>

      {/* Stock */}
      <StoreStock stock={astCatergorriesData} stockList={storeStockList} />

      {/* </View> */}
      {/* Store count */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "blue",
          // width: 20,
        }}
      >
        <Text
          style={{ color: "white", paddingHorizontal: 4, paddingVertical: 2 }}
        >
          {index}
        </Text>
      </View>
    </View>
  );
};

export default Store;
