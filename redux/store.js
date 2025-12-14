import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore } from "redux-persist";

import persistReducer from "redux-persist/es/persistReducer";
import { astsApi } from "./astsSlice";
import { erfsApi } from "./erfsSlice";
import { mediaApi } from "./mediaSlice";
import { MMKV } from "./mmkv";
import offlineReducer from "./offlineSlice";
import { spsApi } from "./spsSlice";
import { storesApi } from "./storesSlice";
import { teamsApi } from "./teamsSlice";
import { trnsApi } from "./trnsSlice";
import { usersApi } from "./usersSlice";

// console.log(`MMKV`, MMKV);
// console.log(`offlineReducer`, offlineReducer);

export const rootReducer = combineSlices(
  erfsApi,
  trnsApi,
  astsApi,
  mediaApi,
  storesApi,
  usersApi,
  spsApi,
  teamsApi,
  {
    offline: offlineReducer,
  }
);

const persistConfig = {
  key: "root",
  storage: {
    setItem: (key, value) => {
      MMKV.setString(key, value);
      return Promise.resolve(true);
    },
    getItem: (key) => {
      const value = MMKV.getString(key);
      return Promise.resolve(value);
    },
    removeItem: (key) => {
      MMKV.removeItem(key);
      return Promise.resolve(true);
    },
  },
  // Optionally, you can whitelist or blacklist specific reducers to persist
  whitelist: [
    // "erfsApi",
    // "trnsApi",
    // "astsApi",
    // "storesApi",
    // "spsApi",
    // "usersApi",
    // "teamsApi",
    // "mediaApi",
    "offline",
  ],
  blacklist: [
    "erfsApi",
    "trnsApi",
    "astsApi",
    "storesApi",
    "spsApi",
    "usersApi",
    "teamsApi",
    "mediaApi",
  ], // To prevent RTK Query cache from being persisted if not desired
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  // reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(
      erfsApi.middleware,
      trnsApi.middleware,
      astsApi.middleware,
      mediaApi.middleware,
      storesApi.middleware,
      spsApi.middleware,
      usersApi.middleware,
      teamsApi.middleware
    ),
});

setupListeners(store.dispatch); // This is important to enable refetchOnFocus/refetchOnReconnect

export const persistor = persistStore(store);
