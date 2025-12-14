import { Redirect, Slot } from "expo-router";

import { useAuth } from "../../context/authContext";

export default function RootLayout() {
  const { user } = useAuth();

  // user logged in → show tabs
  if (user) {
    return <Redirect href="/(tabs)/erfs" />;
  }

  // no user → show auth stack
  return <Slot />;
}
