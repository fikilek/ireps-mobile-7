import { Stack } from "expo-router";

export default function AstsStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Asts List",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="astDetails_"
        options={{
          title: "Ast Details",
          headerBackTitle: "Back",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="astTrns_"
        options={{
          title: "Ast Trns",
          headerBackTitle: "Back",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="astMedia_"
        options={{
          title: "Ast Media",
          headerBackTitle: "Back",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
