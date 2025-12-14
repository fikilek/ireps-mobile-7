import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../config/fbConfig"; // Adjust the import path as necessary

export const storesApi = createApi({
  reducerPath: "storesApi",
  tagTypes: ["stores"],
  // This is the base URL for your API. Adjust it according to your backend setup.
  baseQuery: fakeBaseQuery(),
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getStores: builder.query({
      queryFn: async ({ spId }) => {
        try {
          // console.log(`running stores queryFn`);
          const q = query(
            collection(db, "stores"),
            orderBy("metadata.updatedAtDatetime", "desc"),
            // where("owner.id", "==", spId) // This is either a sp id or workbase (municipality) id
            // where("address.workbaseId", "==", workbaseId)
            limit(10)
          );
          const querySnapshot = await getDocs(q);
          const storesList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // console.log(`storesList`, storesList);

          return { data: storesList };
        } catch (error) {
          console.log(`GetStores error: ${error.message} `);
          return { error: error.message };
        }
      },
      providesTags: ["stores"],
    }),
    getStoresByOwnerId: builder.query({
      queryFn: async ({ spId }) => {
        try {
          // console.log(`getStoresByOwnerId  - running stores queryFn -`, spId);
          const q = query(
            collection(db, "stores"),
            orderBy("metadata.updatedAtDatetime", "desc"),
            where("owner.id", "==", spId)
            // limit(10)
          );
          const querySnapshot = await getDocs(q);
          const storesList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // console.log(`storesList?.length`, storesList?.length);
          return { data: storesList };
        } catch (error) {
          console.log(`GetStoresByOwnerId error: ${error.message} `);
          return { error: error.message };
        }
      },
      providesTags: ["stores"],
    }),
    getStoreById: builder.query({
      queryFn: async (id) => {
        try {
          const docRef = doc(db, "stores", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            return { data: { id: docSnap.id, ...docSnap.data() } };
          } else {
            return { error: "No such document!" };
          }
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: ["stores"],
    }),
    createStore: builder.mutation({
      queryFn: async ({ newStoreData, displayName, uid, id }) => {
        try {
          const timestamp = Timestamp.now();
          const storeRef = doc(db, "stores", id);
          // console.log(`storeRef`, storeRef);

          const newStore = {
            ...newStoreData,
            metadata: {
              ...newStoreData.metadata,
              createdAtDatetime: timestamp,
              createdByUser: displayName,
              createdByUid: uid,
              updatedAtDatetime: timestamp,
              updatedByUser: displayName,
              updatedByUid: uid,
            },
            updateHistory: true,
          };
          // console.log(`newStore`, newStore);

          await setDoc(storeRef, newStore, {
            merge: true,
          });
          return {
            data: `Store [${newStoreData?.storeName}] created successfully`,
          };
        } catch (error) {
          console.log(`createStore error: ${error.message} `);
          return { error: error.message };
        }
      },
      invalidatesTags: ["stores"],
    }),
    updateStore: builder.mutation({
      queryFn: async ({ displayName, uid, id, storeData }) => {
        // console.log(`updateStore data ------------------------------------`);
        // console.log(`displayName`, displayName);
        // console.log(`uid`, uid);
        // console.log(`id`, id);
        // console.log(`storeData`, storeData);

        // get store name
        const { storeName } = storeData || {};
        try {
          const storeRef = doc(db, "stores", id);
          // console.log(`storeRef`, storeRef);
          await setDoc(
            storeRef,
            {
              ...storeData,
              metadata: {
                ...storeData.metadata,
                updatedAtDatetime: Timestamp.now(),
                updatedByUser: displayName,
                updatedByUid: uid,
              },
            },
            { merge: true }
          );
          return { data: `Store [${storeName}] updated successfully` };
        } catch (error) {
          console.log(`updateStore error: ${error.message} `);
          return { error: `Store update error` };
        }
      },
      invalidatesTags: ["stores"],
    }),
    deleteStore: builder.mutation({
      queryFn: async (id) => {
        // Flag the store as deleted. Don't ever delete.
        try {
          await deleteDoc(doc(db, "stores", id));
          return { data: `Store with id [${id}] deleted successfully` };
        } catch (error) {
          console.log(`deleteStore error: ${error.message} `);
          return { error: error.message };
        }
      },
      invalidatesTags: ["stores"],
    }),
  }),
});
// console.log(`storesApi`, storesApi);

export const {
  useGetStoresQuery,
  useGetStoresByOwnerIdQuery,
  useGetStoreByIdQuery,
  useCreateStoreMutation,
  useUpdateStoreMutation,
  useDeleteStoreMutation,
} = storesApi;
