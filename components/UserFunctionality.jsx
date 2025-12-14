import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { useAuth } from "../context/authContext";
import { CustomMenuItem } from "./CustomMenuItem";

const UserFunctionality = () => {
  const router = useRouter();
  const { user, logout, initials } = useAuth();
  // console.log(`MainLayout user`, user);
  // console.log(`MainLayout isAuthenticated`, isAuthenticated);

  // const { displayName } = user || {};
  // console.log(`MainLayout uid`, uid);
  // console.log(`MainLayout claims`, claims);
  // console.log(`MainLayout displayName`, displayName);

  // const displayInitials = getDisplayInitials(displayName);
  // console.log(`displayInitials`, displayInitials);

  const handleUserStats = () => {
    // console.log(`View user Stats`);
    router.navigate({
      pathname: `/admin/userStats_`,
    });
  };

  const handleUserSettings = () => {
    // console.log(`View user Settings`);
    router.navigate({
      pathname: `/admin/userSettings_`,
    });
  };

  const handleProfile = () => {
    // console.log(`View user profile`);
    router.navigate({
      pathname: `/admin/userProfile_`,
    });
  };

  return (
    <View>
      <Menu>
        <MenuTrigger>
          <Text
            style={{
              padding: 3,
              fontSize: 15,
              backgroundColor: "grey",
              width: 42,
              textAlign: "center",
              color: "white",
            }}
          >
            {initials}
          </Text>
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              // borderRadius: 10,
              borderCurve: "continuous",
              backgroundColor: "white",
              marginTop: 40,
              // padding: 25,
            },
          }}
        >
          <CustomMenuItem
            text="User Profile"
            action={handleProfile}
            value={null}
            icon={<Feather name="user" size={25} color="gray" />}
          />
          <View style={{ backgroundColor: "lightgrey", height: 1 }} />
          <CustomMenuItem
            text="User Stats"
            action={handleUserStats}
            value={null}
            icon={<Ionicons name="stats-chart" size={25} color="gray" />}
          />
          <View style={{ backgroundColor: "lightgrey", height: 1 }} />
          <CustomMenuItem
            text="User Settings"
            action={handleUserSettings}
            value={null}
            icon={<Ionicons name="settings-outline" size={25} color="gray" />}
          />
          <View style={{ backgroundColor: "lightgrey", height: 1 }} />

          <CustomMenuItem
            text="Signout"
            action={logout}
            value={null}
            icon={<MaterialIcons name="logout" size={25} color="gray" />}
          />
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default UserFunctionality;
