import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";

import { useAuth } from "../context/authContext";
import { useGetUserByIdQuery } from "../redux/usersSlice";
import UserFunctionality from "./UserFunctionality";

export const HeaderAdmin = (props) => {
  // const { destination = null } = props;
  const navigation = useNavigation("admin/stores_");

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

  return (
    <View
      style={{
        marginTop: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10,
        paddingBottom: 5,
      }}
    >
      {status !== "pending" &&
      status !== "disabled" &&
      status !== "" &&
      status !== null &&
      spId &&
      spName &&
      workbases &&
      workbases?.length !== 0 ? (
        <MaterialIcons
          name="menu"
          size={30}
          color="indigo"
          onPress={() => navigation.openDrawer()}
          style={{ padding: 3 }}
        />
      ) : (
        <Text></Text>
      )}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 19 }}>Admin</Text>
        <Text style={{ fontSize: 8 }}>{workbase}</Text>
      </View>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <UserFunctionality />
        <Text style={{ fontSize: 8 }}>{spName}</Text>
      </View>
    </View>
  );
};
