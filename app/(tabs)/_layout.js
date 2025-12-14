import {
  Entypo,
  FontAwesome,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";

import MainPageHeader from "../../components/MainPageHeader";

export default function TabLayout() {
  console.log(`TabLayout ----running`);

  return (
    <Tabs>
      <Tabs.Screen
        name="erfs"
        options={{
          title: "Erfs",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="place" size={24} color="black" />
          ),
          tabBarLabel: "ERFS",
          header: () => <MainPageHeader mainMenuName="ERFS" />,
        }}
      />
      <Tabs.Screen
        name="trns"
        options={{
          title: "Trns",
          tabBarIcon: ({ color }) => (
            <Entypo name="hour-glass" size={24} color="black" />
          ),
          tabBarLabel: "TRNS",
          header: () => <MainPageHeader mainMenuName="TRNS" />,
        }}
      />
      <Tabs.Screen
        name="asts"
        options={{
          title: "Meters",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="electric-meter" size={24} color="black" />
          ),
          tabBarLabel: "Meters",
          header: () => <MainPageHeader mainMenuName="ASTS" />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="map-location" size={24} color="black" />
          ),
          tabBarLabel: "Map",
          header: () => <MainPageHeader mainMenuName="MAP" />,
        }}
      />
      <Tabs.Screen
        name="dashBoard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Entypo name="bar-graph" size={24} color="black" />
          ),
          tabBarLabel: "Dashboard",
          header: () => <MainPageHeader mainMenuName="Dashboard" />,
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          title: "Drawer",
          // href: null,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="cubes" size={24} color="black" />
          ),
          tabBarLabel: "Admin",
          header: () => <MainPageHeader mainMenuName="ADMIN" />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "index",
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
