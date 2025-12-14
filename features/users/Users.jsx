import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { useUsers } from "../../hooks/useUsers";
import { styles } from "../../utils/utilsGlobalStyles";
import User from "./User";

const Users = () => {
  const { activeUsers, isLoading, isError, isFetching } = useUsers();
  // console.log(`actveUsers`, activeUsers);
  // console.log(`activeUsers?.length`, activeUsers?.length);

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
            // position: "relative",
            marginBottom: 40,
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
            <Text style={{ color: "white", padding: 5 }}>Users List</Text>
            <Text style={{ color: "white", padding: 5 }}>
              Total Users: {activeUsers?.length}
            </Text>
          </View>
          {/* Body */}
          <View
            style={{
              // position: "relative",
              marginBottom: 5,
            }}
          >
            <FlatList
              data={activeUsers}
              renderItem={({ item }) => <User userData={item} />}
              keyExtractor={(item) => item?.id}
              initialNumToRender={10}
              ItemSeparatorComponent={
                <View style={{ height: 10, backgroundColor: "lightblue" }} />
              }
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Users;
