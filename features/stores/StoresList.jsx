import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { useAuth } from "../../context/authContext";
import { useGetUserByIdQuery } from "../../redux/usersSlice";
import StoreStockListHeader from "./StoreStockListHeader";

const StoresList = (props) => {
  const { store, astsInStore, label } = props;
  // console.log(`StoresList store`, JSON.stringify(store, null, 2));
  // console.log(`StoresList astsInStore`, astsInStore);
  // console.log(`StoresList label`, label);

  // Check if user has has a workbase
  const { user } = useAuth();
  // console.log(`MainLayout user`, user);
  const { uid, claims, displayName } = user || {};
  // console.log(`MainLayout uid`, uid);
  // const { workbase } = claims || {};
  // console.log(`MainLayout workbase`, workbase);
  const { data } = useGetUserByIdQuery(uid);
  const { status, serviceProvider, workbases, workbase } = data || {};
  const { id: spId, name: spName } = serviceProvider || {};

  const {
    id: storeId,
    storeName,
    owner: { id: storeOwnerId },
  } = store;
  // const storeData = { id, storeName };

  const router = useRouter();
  let rowNumber = 1;

  const addNewAst = () => {
    console.log(`Creating new ast`);
    router.navigate({
      pathname: `/trnsDisplays/trnFormGrv_`,
      params: {
        // ast: JSON.stringify(null),
        newAst: JSON.stringify(true),
        storeData: JSON.stringify({ id: storeId, storeName }),
        irepsKeyItem: "ast",
      },
    });
  };
  return (
    <View style={{ height: "100%", position: "relative" }}>
      <StoreStockListHeader
        listName="Stock List"
        storeName={store?.storeName}
        astCat={label}
        total={astsInStore?.length}
        addNewAst={addNewAst}
        spId={spId}
        storeOwnerId={storeOwnerId}
      />

      {astsInStore?.map((ast) => {
        const {
          astData: { astCat, astNo, astManufacturer, astName },
        } = ast;

        const openGrvForm = (ast) => {
          // console.log(`Edit ast`, ast);
          // console.log(`Edit ast: `, ast?.astData?.astNo);
          // console.log(`StoresList Edit ast`, JSON.stringify(ast, null, 2));

          // const parsedData = JSON.parse(data);
          router.navigate({
            pathname: `/trnsDisplays/astFormGrvAstEdit_`,
            params: {
              astData: JSON.stringify(ast),
            },
          });
        };

        const deleteGrvForm = () => {
          console.log(`delete grv - ast`, ast?.astData?.astNo);
          // Call a redux slice method to flad as as deleted
        };

        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 5,
              backgroundColor: "lightgrey",
              margin: 5,
            }}
            key={ast?.id}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                paddingVertical: 3,
                paddingHorizontal: 5,
              }}
            >
              <Text>{rowNumber++}</Text>
              <Text>{astCat}</Text>
              <Text>{astNo}</Text>
              <Text>{astManufacturer}</Text>
              <Text>{astName}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                paddingVertical: 3,
                paddingHorizontal: 5,
              }}
            >
              {spId === storeOwnerId && (
                <>
                  <MaterialIcons
                    name="edit"
                    size={20}
                    color="indigo"
                    onPress={() => openGrvForm(ast)}
                    style={{ padding: 3, borderWidth: 1 }}
                  />
                  <MaterialIcons
                    name="delete"
                    size={20}
                    color="indigo"
                    onPress={deleteGrvForm}
                    style={{ padding: 3, borderWidth: 1 }}
                  />
                </>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default StoresList;
