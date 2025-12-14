import { MMKVLoader } from "react-native-mmkv-storage";

export const MMKV = new MMKVLoader()
  .withEncryption() // optional
  .initialize();

// Function to clear all data
export const clearAllData = () => {
  try {
    MMKV.clearStore();
    console.log("All MMKV storage data cleared successfully.");
  } catch (error) {
    console.error("Error clearing MMKV storage:", error);
  }
};
