import NetInfo from "@react-native-community/netinfo";

export const isThereConnectivity = async () => {
  const state = await NetInfo.fetch();

  console.log("Connection state", state);
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);

  // You can also check for specific types like 'wifi', 'cellular', 'none', 'unknown'
  if (state.isConnected) {
    console.log("Device is connected to the internet.");
    return true;
  } else {
    console.log("Device is not connected to the internet.");
    return false;
  }
};
