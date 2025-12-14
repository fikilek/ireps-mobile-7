import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { HeaderAdmin } from "../../../components/HeaderAdmin";

// import { Header } from "../trnsDisplays/_layout";
// import { getErfType } from "../../util/utilsErfs";

const AdminLayout = () => {
  // const data = useLocalSearchParams();
  // console.log(`AdminLayout data`, data);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          // headerShown: false,
          // header: () => <Text style={{ paddingTop: 45 }}>Drawer Header</Text>,
        }}
        // drawerContent={CustomDrawerContent}
      >
        <Drawer.Screen
          name="stores_"
          options={{
            // href: null,
            drawerLabel: "Stores",
            title: "Stores",
            header: (headerData) => {
              return <HeaderAdmin destination={""} />;
            },
            // drawerIcon: (size, color) => (
            // 	<MaterialIcons
            // 		name="menu"
            // 		size={30}
            // 		color="indigo"
            // 		onPress={() => {}}
            // 		style={{ padding: 3 }}
            // 	/>
            // ),
          }}
        />
        <Drawer.Screen
          name="storesAstsInSpHands_"
          options={{
            // href: null,
            drawerLabel: "Asts In Sp Hands",
            title: "Asts In Sp Hands",
            header: (headerData) => {
              return <HeaderAdmin destination={""} />;
            },
            // drawerIcon: (size, color) => (
            // 	<MaterialIcons
            // 		name="menu"
            // 		size={30}
            // 		color="indigo"
            // 		onPress={() => {}}
            // 		style={{ padding: 3 }}
            // 	/>
            // ),
          }}
        />
        <Drawer.Screen
          name="storesAstsInSpHandsWithSpId_"
          options={{
            drawerItemStyle: { display: "none" },
            // href: null,
            drawerLabel: "",
            title: "",
            header: () => <HeaderAdmin destination={""} />,
            // drawerIcon: (size, color) => (
            // 	<MaterialIcons
            // 		name="menu"
            // 		size={30}
            // 		color="indigo"
            // 		onPress={() => {}}
            // 		style={{ padding: 3 }}
            // 	/>
            // ),
          }}
        />
        <Drawer.Screen
          name="sps_"
          options={{
            // href: null,
            drawerLabel: "Service Providers",
            title: "Service Providers",
            header: () => <HeaderAdmin destination={""} />,
            // drawerIcon: (size, color) => (
            // 	<MaterialIcons
            // 		name="menu"
            // 		size={30}
            // 		color="indigo"
            // 		onPress={() => {}}
            // 		style={{ padding: 3 }}
            // 	/>
            // ),
          }}
        />
        <Drawer.Screen
          name="spSubForm_"
          options={{
            // href: null,
            drawerItemStyle: { display: "none" },
            drawerLabel: "Sp Sub Form",
            title: "Sp Sub Form",
            header: () => <HeaderAdmin destination={""} />,
            // drawerIcon: (size, color) => (
            // 	<MaterialIcons
            // 		name="menu"
            // 		size={30}
            // 		color="indigo"
            // 		onPress={() => {}}
            // 		style={{ padding: 3 }}
            // 	/>
            // ),
          }}
        />
        <Drawer.Screen
          name="teams_"
          options={{
            // href: null,
            drawerLabel: "Teams",
            title: "Teams",
            header: () => <HeaderAdmin destination={""} />,
            // drawerIcon: (size, color) => (
            // 	<MaterialIcons
            // 		name="menu"
            // 		size={30}
            // 		color="indigo"
            // 		onPress={() => {}}
            // 		style={{ padding: 3 }}
            // 	/>
            // ),
          }}
        />
        <Drawer.Screen
          name="users_"
          options={{
            // href: null,
            drawerLabel: "Users",
            title: "Users",
            header: () => <HeaderAdmin destination={""} />,
            // drawerIcon: (size, color) => (
            // 	<MaterialIcons
            // 		name="menu"
            // 		size={30}
            // 		color="indigo"
            // 		onPress={() => {}}
            // 		style={{ padding: 3 }}
            // 	/>
            // ),
          }}
        />
        <Drawer.Screen
          name="userForm_"
          options={{
            drawerItemStyle: { display: "none" },
            // href: null,
            drawerLabel: "User Form",
            title: "User Form",
            header: () => <HeaderAdmin destination={""} />,
            // drawerIcon: (size, color) => (
            // 	<MaterialIcons
            // 		name="menu"
            // 		size={30}
            // 		color="indigo"
            // 		onPress={() => {}}
            // 		style={{ padding: 3 }}
            // 	/>
            // ),
          }}
        />
        <Drawer.Screen
          name="workbases_"
          options={{
            // href: null,
            drawerLabel: "Workbases",
            title: "Workbases",
            header: () => <HeaderAdmin destination={""} />,
            // drawerIcon: (size, color) => (
            // 	<MaterialIcons
            // 		name="menu"
            // 		size={30}
            // 		color="indigo"
            // 		onPress={() => {}}
            // 		style={{ padding: 3 }}
            // 	/>
            // ),
          }}
        />
        <Drawer.Screen
          name="storesForm_"
          options={{
            drawerItemStyle: { display: "none" },
            // href: null,
            drawerLabel: "Store Form_",
            title: "Store Form",
            header: () => <HeaderAdmin destination={""} />,
            // drawerIcon: (size, color) => (
            // 	<MaterialIcons
            // 		name="menu"
            // 		size={30}
            // 		color="indigo"
            // 		onPress={() => {}}
            // 		style={{ padding: 3 }}
            // 	/>
            // ),
          }}
        />
        <Drawer.Screen
          name="spForm_"
          options={{
            drawerItemStyle: { display: "none" },
            // href: null,
            drawerLabel: "Service Provider Form_",
            title: "Service Provider Form",
            header: () => <HeaderAdmin destination={""} />,
            // drawerIcon: (size, color) => (
            // 	<MaterialIcons
            // 		name="menu"
            // 		size={30}
            // 		color="indigo"
            // 		onPress={() => {}}
            // 		style={{ padding: 3 }}
            // 	/>
            // ),
          }}
        />
        <Drawer.Screen
          name="storeStockList_"
          options={{
            drawerItemStyle: { display: "none" },
            // href: null,
            drawerLabel: "Stock List",
            title: "Stock List",
            header: () => <HeaderAdmin destination={""} />,
            // drawerIcon: (size, color) => (
            // 	<MaterialIcons
            // 		name="menu"
            // 		size={30}
            // 		color="indigo"
            // 		onPress={() => {}}
            // 		style={{ padding: 3 }}
            // 	/>
            // ),
          }}
        />
        <Drawer.Screen
          name="userProfile_"
          options={{
            drawerItemStyle: { display: "none" },
            href: null,
            drawerLabel: "User Profile",
            title: "User Profile",
            header: () => <HeaderAdmin destination={""} />,
            // drawerIcon: (size, color) => (
            // 	<MaterialIcons
            // 		name="menu"
            // 		size={30}
            // 		color="indigo"
            // 		onPress={() => {}}
            // 		style={{ padding: 3 }}
            // 	/>
            // ),
          }}
        />
        <Drawer.Screen
          name="userStats_"
          options={{
            drawerItemStyle: { display: "none" },
            href: null,
            drawerLabel: "User Stats",
            title: "User Stats",
            header: () => <HeaderAdmin destination={""} />,
            // drawerIcon: (size, color) => (
            // 	<MaterialIcons
            // 		name="menu"
            // 		size={30}
            // 		color="indigo"
            // 		onPress={() => {}}
            // 		style={{ padding: 3 }}
            // 	/>
            // ),
          }}
        />
        <Drawer.Screen
          name="userSettings_"
          options={{
            drawerItemStyle: { display: "none" },
            href: null,
            drawerLabel: "User Settings",
            title: "User Settings",
            header: () => <HeaderAdmin destination={""} />,
            // drawerIcon: (size, color) => (
            // 	<MaterialIcons
            // 		name="menu"
            // 		size={30}
            // 		color="indigo"
            // 		onPress={() => {}}
            // 		style={{ padding: 3 }}
            // 	/>
            // ),
          }}
        />
        <Drawer.Screen
          name="teamForm_"
          options={{
            drawerItemStyle: { display: "none" },
            // href: null,
            drawerLabel: "",
            title: "",
            header: () => <HeaderAdmin destination={""} />,
            // drawerIcon: (size, color) => (
            // 	<MaterialIcons
            // 		name="menu"
            // 		size={30}
            // 		color="indigo"
            // 		onPress={() => {}}
            // 		style={{ padding: 3 }}
            // 	/>
            // ),
          }}
        />
        <Drawer.Screen
          name="index"
          options={{
            drawerItemStyle: { display: "none" },
            // href: null,
            drawerLabel: "",
            title: "",
            header: () => <HeaderAdmin destination={""} />,
            // drawerIcon: (size, color) => (
            // 	<MaterialIcons
            // 		name="menu"
            // 		size={30}
            // 		color="indigo"
            // 		onPress={() => {}}
            // 		style={{ padding: 3 }}
            // 	/>
            // ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default AdminLayout;
