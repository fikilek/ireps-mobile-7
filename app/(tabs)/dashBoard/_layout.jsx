import { Stack } from "expo-router/stack";

const DashboardDisplayLayout = () => {
  console.log(` `);
  console.log(` `);
  console.log(`DashboardDisplayLayout ----START START running`);
  console.log(`DashboardDisplayLayout ----START START running`);

  console.log(`DashboardDisplayLayout ----END END running`);
  console.log(`DashboardDisplayLayout ----END END running`);
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
    </Stack>
  );
};

export default DashboardDisplayLayout;
