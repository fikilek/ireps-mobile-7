import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { Alert } from "react-native";

import { MenuProvider } from "react-native-popup-menu";
import { Provider } from "react-redux";
import { AuthContextProvider, useAuth } from "../context/authContext";
import { MediaContextProvider } from "../context/MediaContext";
import { store } from "../redux/store";
import { useGetUserByIdQuery } from "../redux/usersSlice";

const MainLayout = () => {
  console.log(" ");
  console.log(" ");
  console.log(" ");
  console.log(`MainLayout ----START START START running`);
  console.log(`MainLayout ----STRRT START START running`);
  console.log(`MainLayout ----STRRT START START running`);

  // const { updateMediaData } = useMediaContext();
  // updateMediaData({ isConnected });

  const { user, isAuthenticated, initials } = useAuth();
  // console.log(`MainLayout ----user:`, user);
  console.log(`MainLayout ----isAuthenticated:`, isAuthenticated);
  console.log(`MainLayout ----initials:`, initials);

  const segments = useSegments();
  console.log(`MainLayout ----segments:`, segments);

  const router = useRouter();

  const { uid, displayName } = user || {};
  console.log(`MainLayout ----uid:`, uid);
  console.log(`MainLayout ----displayName:`, displayName);

  const { data } = useGetUserByIdQuery(uid);
  // console.log(`MainLayout ----data:`, JSON.stringify(data, null, 2));

  const { serviceProvider, workbases, workbase } = data || {};
  console.log(`MainLayout ----serviceProvider:`, serviceProvider);
  console.log(`MainLayout ----workbases:`, workbases);
  console.log(`MainLayout ----workbase:`, workbase);

  const spName = serviceProvider ? serviceProvider?.name : "";
  console.log(`MainLayout ----spName:`, spName);

  useEffect(() => {
    console.log(`MainLayout ----useEffect`);

    if (typeof isAuthenticated === "undefined") return;
    const inApp = segments[0] === "(app)";
    console.log(`MainLayout ----useEffect ----inApp`, inApp);

    if (isAuthenticated && !inApp) {
      // TODO: Consider to call redux hooks to load erfs, trns, asts and users here.

      // In the follwing 3 steps, check if user has completed onboarding

      // Check if there is a user
      if (!user || !data) {
        console.log(
          `MainLayout ----useEffect ----useEffect ----no user - return`
        );
        return;
      }

      // Check if use is 'active'

      // Check if user has workbases allocated
      if (!workbases || workbases?.length === 0) {
        // User has not been allocated workbase(s)
        console.log(
          `MainLayout ----useEffect ----User has not been allocated workbase(s)`
        );
        Alert.alert(
          "Onboarding incomplete.",
          `Signed in as [${displayName}]. No workbase(s) allocated. Talk to your manager.`
        );
        router.push("ireps");
        return;
      }

      // Check if user has service provider
      if (!serviceProvider || !spName || serviceProvider === undefined) {
        // User not assigned to Service provider
        console.log(
          `MainLayout ----useEffect ----User not assigned to Service provider`
        );
        Alert.alert(
          "Onboarding incomplete.",
          `Signed in as [${displayName}]. Not assigned a Service Provider. Talk to your manager.`
        );
        router.push("ireps");
        return;
      }

      // Check if user has workbase
      if (
        workbase?.trim() === "workbase" ||
        workbase?.trim() === "" ||
        workbase?.trim() === undefined ||
        workbase?.trim() === null
      ) {
        // User has no not selected a workbase
        console.log(
          `MainLayout ----useEffect ----User has no not selected a workbase`
        );
        Alert.alert(
          "Onboarding incomplete.",
          `Signed in as [${displayName}]. Signout and Signin again, then proceed to your profile and select a workbase.`
        );
        router.push("ireps");
        return;
      }

      // Check if the user has verified email adr

      // Check if the user has verified cellphomne number adr

      console.log(`MainLayout ----useEffect ----route user to erfs screen`);
      console.log(`MainLayout ----useEffect ----route user to erfs screen`);
      router.push("/(tabs)/erfs");
    } else if (isAuthenticated === false) {
      console.log(`MainLayout ----useEffect ----route to signin screen`);
      router.push("/signin");
    }
  }, [isAuthenticated, user, data, displayName]);

  console.log(`MainLayout ----END END END running`);
  console.log(`MainLayout ----END END END running`);
  console.log(`MainLayout ----END END END running`);
  console.log(" ");
  console.log(" ");
  console.log(" ");

  return <Slot />;
};

const RootLayout = () => {
  return (
    <MediaContextProvider>
      <MenuProvider>
        <AuthContextProvider>
          <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
            <MainLayout />
            {/* </PersistGate> */}
          </Provider>
        </AuthContextProvider>
      </MenuProvider>
    </MediaContextProvider>
  );
};

export default RootLayout;
