import { Platform, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAuth } from "../context/authContext.js";
import { useGetUserByIdQuery } from "../redux/usersSlice.js";
import UserFunctionality from "./UserFunctionality.jsx";

const ios = Platform.OS === "ios";

const MainPageHeader = ({ mainMenuName }) => {
  const { top } = useSafeAreaInsets();

  const { user, isAuthenticated, logout } = useAuth();
  // console.log(`MainLayout user`, user);
  // console.log(`MainLayout isAuthenticated`, isAuthenticated);

  const { uid, claims, displayName } = user || {};
  // console.log(`MainLayout uid`, uid);
  // console.log(`MainLayout claims`, claims);
  // console.log(`MainLayout displayName`, displayName);

  const { data } = useGetUserByIdQuery(uid);

  const { status, serviceProvider, workbases, workbase } = data || {};

  const { id: spId, name: spName } = serviceProvider || {};

  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 5,
        paddingTop: ios ? top : top + 10,
      }}
      // className={
      // 	"flex-row items-center justify-between px-5 bg-indigo-100 pb-6"
      // }
    >
      {/* <MaterialIcons
        name="menu"
        size={30}
        color="indigo"
        onPress={openAdminDrawer}
        style={{ padding: 3 }}
      /> */}
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          // paddingLeft: 10,
          // paddingHorizontal: 5,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "lightgrey",
        }}
      >
        <Text style={{ fontSize: 20 }} className="font-medium">
          {mainMenuName}
        </Text>
        <Text style={{ fontSize: 20 }} className="font-medium">
          {workbase}
          {/* TODO: Provide workbase and ward from user object */}
        </Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <UserFunctionality />
          <Text style={{ fontSize: 9 }}>{spName}</Text>
        </View>
      </View>
    </View>
  );
};

export default MainPageHeader;
