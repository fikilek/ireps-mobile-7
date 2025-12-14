import { Stack } from "expo-router/stack";

const MapDisplayLayout = () => {
  console.log(` `);
  console.log(` `);
  console.log(`MapDisplayLayout ----START START running`);
  console.log(`MapDisplayLayout ----START START running`);

  console.log(`MapDisplayLayout ----END END running`);
  console.log(`MapDisplayLayout ----END END running`);
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

export default MapDisplayLayout;
