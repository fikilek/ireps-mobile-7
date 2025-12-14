import { Stack } from "expo-router";
import HeaderLeft from "../../../components/HeaderLeft";
import HeaderRight from "../../../components/HeaderRight";
import HeaderTitle from "../../../components/HeaderTitle";

export default function TrnsStackLayout() {
  console.log(` `);
  console.log(` `);
  console.log(`TrnsStackLayout ----START START running`);
  console.log(`TrnsStackLayout ----START START running`);

  console.log(`TrnsStackLayout ----END END running`);
  console.log(`TrnsStackLayout ----END END running`);
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
        name="trnFormMeterCommission_"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Commissioning"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="trnFormMeterDecommission_"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Decommissioning"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="trnFormGrv_"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Grv"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="trnFormMeterAudit_"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Meter Audits"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="trnFormMeterCheckIn_"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Checkin"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="trnFormMeterCheckOutInit_"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Checkout Init"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="trnFormMeterCheckOutConfirm_"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Checkout Confirm"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="trnFormMeterDisconnection_"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Disconnection"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="trnFormMeterInspection_"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Inspection"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="trnFormMeterInstallation_"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Installation"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="trnFormMeterReconnection_"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Reconnection"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="trnFormMeterVend_"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Vending"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="trnFormMeterLost_"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Lost Meter"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="trnFormMeterUninstall_"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Uninstall"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="trnFormMeterFound_"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Meter Found"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="trnMedia"
        options={{
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerLeft: () => <HeaderLeft title={"Media"} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        }}
      />
    </Stack>
  );
}
