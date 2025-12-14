import { Text, View } from "react-native";

import UserFunctionality from "../components/UserFunctionality";
import { useAuth } from "../context/authContext";
import { useGetUserByIdQuery } from "../redux/usersSlice";

const HeaderScreen = (props) => {
  // Check if user has has a workbase
  const { user } = useAuth();
  // console.log(`MainLayout user`, user);

  const { uid, claims, displayName } = user || {};
  // console.log(`MainLayout uid`, uid);

  // const { workbase } = claims || {};
  // console.log(`MainLayout workbase`, workbase);

  const { data } = useGetUserByIdQuery(uid);

  const { serviceProvider } = data || {};

  const { name: spName } = serviceProvider || {};

  const { erfNo, erfType, destination = null } = props;
  return (
    <View
      style={{
        marginTop: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        // alignItems: "center",
        marginHorizontal: 5,
        // paddingBottom: 5,
        // backgroundColor: "yellow",
      }}
    >
      {/* <BtnGoBack destination={destination} /> */}
      <View style={{ flexDirection: "row", gap: 4, paddingTop: 3 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Erf No</Text>
        <Text
          style={{
            fontSize: 18,
            // borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 2,
            // borderColor: "lightgrey",
          }}
        >
          {erfNo ? erfNo : "N/Av"}
        </Text>
      </View>

      <Text style={{ fontSize: 18, paddingTop: 3 }}>
        {erfType ? `${erfType} Erf` : "No Erf Type"}
      </Text>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <UserFunctionality />
        <Text style={{ fontSize: 10 }}>{spName}</Text>
      </View>
    </View>
  );
};

export default HeaderScreen;
