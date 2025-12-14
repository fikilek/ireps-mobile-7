import { Stack } from "expo-router/stack";
import HeaderLeft from "../../../components/HeaderLeft";
import HeaderRight from "../../../components/HeaderRight";
import HeaderTitle from "../../../components/HeaderTitle";

const ErfsDisplayLayout = () => {
  console.log(` `);
  console.log(` `);
  console.log(`ErfsDisplayLayout ----START START running`);
  console.log(`ErfsDisplayLayout ----START START running`);

  console.log(`ErfsDisplayLayout ----END END running`);
  console.log(`ErfsDisplayLayout ----END END running`);
  console.log(` `);
  console.log(` `);

  return (
    <Stack
      screenOptions={{
        // headerShown: false,
        headerStyle: {
          // backgroundColor: "#ffaf96ff",
          backgroundColor: "grey",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="erfDetails"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Erf Details"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="erfFormErfAdr"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Erf Adr"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="erfFormPropertyType"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Property Type"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="erfFormServiceConnection_"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Service Connection"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="erfMedia"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Erf Media"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="erfMetersOnErf"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Erf Services"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="erfNoAccessTrns"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"No Access"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="erfOnMap"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Erf On Map"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
    </Stack>
  );
};

export default ErfsDisplayLayout;
