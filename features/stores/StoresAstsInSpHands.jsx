import { FlatList, Text, View } from "react-native";
import StoresAstInSpHands from "./StoresAstInSpHands";

const StoresAstsInSpHands = (props) => {
  const { asts, spName } = props;
  // console.log(`StoresAstsInSpHands store`, JSON.stringify(store, null, 2));
  // console.log(`StoresAstsInSpHands astsInStore`, astsInStore);
  // console.log(`StoresAstsInSpHands label`, label);

  // // Check if user has has a workbase
  // const { user } = useAuth();
  // // console.log(`MainLayout user`, user);
  // const { uid, claims, displayName } = user || {};
  // // console.log(`MainLayout uid`, uid);
  // // const { workbase } = claims || {};
  // // console.log(`MainLayout workbase`, workbase);
  // const { data } = useGetUserByIdQuery(uid);
  // const { status, serviceProvider, workbases, workbase } = data || {};
  // const { id: spId, name: spName } = serviceProvider || {};

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          // position: "relative",
          marginBottom: 30,
          flex: 1,
        }}
      >
        <View
          style={{
            // flexDirection: "row",
            justifyContent: "space-between",
            // alignItems: "center",
            gap: 2,
            backgroundColor: "lightgreen",
            margin: 5,
            padding: 5,
            // width: "auto",
          }}
        >
          {/* Header 1 */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              backgroundColor: "lightgreen",
              // marginHorizontal: 5,
              width: "auto",
            }}
          >
            <View
              style={{
                backgroundColor: "grey",
                alignItems: "center",
                padding: 2,
                height: 20,
                width: 82 + 45,
              }}
            >
              <Text style={{ fontSize: 12, color: "white" }}>
                {spName} Asts
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "grey",
                alignItems: "center",
                padding: 2,
                height: 20,
                width: 70,
              }}
            >
              <Text style={{ fontSize: 12, color: "white" }}>
                Total: {asts?.length}
              </Text>
            </View>
          </View>
          {/* Header 2 */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              backgroundColor: "lightgreen",
              // marginHorizontal: 5,
              width: "auto",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                // paddingVertical: 3,
                // paddingHorizontal: 2,
                // marginHorizontal: 5,
                backgroundColor: "lightgreen",
                // height: 25,
              }}
            >
              <View style={{ width: 10, backgroundColor: "white", padding: 2 }}>
                <Text style={{ fontSize: 11 }}>#</Text>
              </View>
              <View style={{ width: 67, backgroundColor: "white", padding: 2 }}>
                <Text style={{ fontSize: 11 }}>Meter No</Text>
              </View>
              <View style={{ width: 40, backgroundColor: "white", padding: 2 }}>
                <Text style={{ fontSize: 11 }}>State</Text>
              </View>
              <View
                style={{ width: "auto", backgroundColor: "white", padding: 2 }}
              >
                <Text style={{ fontSize: 11 }}>Store Name / sp</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 5,
                // paddingVertical: 3,
                // paddingHorizontal: 5,
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 2,
                  width: 20,
                  height: 20,
                }}
              >
                <Text style={{ fontSize: 12 }}>C</Text>
              </View>

              <View
                style={{
                  backgroundColor: "white",
                  padding: 2,
                  width: 20,
                  height: 20,
                }}
              >
                <Text style={{ fontSize: 12 }}>E</Text>
              </View>

              <View
                style={{
                  backgroundColor: "white",
                  padding: 2,
                  width: 20,
                  height: "100%",
                }}
              >
                <Text style={{ fontSize: 12 }}>D</Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <FlatList
            // ItemSeparatorComponent={() => <ListItemSeperator />}
            style={{ flexGrow: 1, marginTop: 1 }}
            data={asts}
            renderItem={({ item, index }) => (
              <StoresAstInSpHands ast={item} index={++index} />
            )}
            keyExtractor={(item) => item?.id}
            // onEndReached={onEndReached}
            // onEndReachedThreshold={0.5}
            // initialNumToRender={10}
          />
        </View>
      </View>
    </View>
  );
};

export default StoresAstsInSpHands;
