import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  // addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../config/fbConfig"; // Adjust the import path as necessary
import { erfsApi } from "./erfsSlice";
// import uuid from "react-native-uuid";

// const timestamp = Timestamp.now();
export const trnsApi = createApi({
  reducerPath: "trnsApi",
  tagTypes: ["Trns"],
  baseQuery: fakeBaseQuery(),
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getTrns: builder.query({
      queryFn: (workbase) => {
        console.log(`getTrns ----running --------- workbase`, workbase);
        return { data: [] };
      }, // Initial data fetch is not needed with onCacheEntryAdded
      providesTags: ["Trns"],
      async onCacheEntryAdded(
        workbase,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        console.log(`getTrns ---- onCacheEntryAdded workbase`, workbase);
        if (!workbase) return;
        try {
          // Wait for the initial cache data to be loaded
          await cacheDataLoaded;
          // Set up the Firestore listener
          const q = query(
            collection(db, "trns"),
            where("ast.erf.address.lmMetro", "==", workbase),
            orderBy("metadata.updatedAtDatetime", "desc")
            // limit(150)
          );
          // const trnsRef = collection(db, "trns");
          const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              const team = { id: change.doc?.id, ...change.doc.data() };
              // console.log(`snapshot team`, team);
              // Use updateCachedData to update the store with each change
              updateCachedData((draft) => {
                // console.log(`draft`, draft);
                if (change.type === "added") {
                  // console.log(`trn added`);
                  draft.push(team);
                } else if (change.type === "modified") {
                  const index = draft.findIndex(
                    (item) => item?.id === team?.id
                  );
                  if (index !== -1) {
                    // console.log(`trn modified`);
                    draft[index] = team;
                  }
                } else if (change.type === "removed") {
                  const index = draft.findIndex(
                    (item) => item?.id === team?.id
                  );
                  if (index !== -1) {
                    // console.log(`trn removed`);
                    draft.splice(index, 1);
                  }
                }
                draft.sort((a, b) => {
                  // console.log(`a`, a);
                  // Firebase Timestamps have a toMillis() method that returns milliseconds
                  return (
                    b.metadata.updatedAtDatetime.toMillis() -
                    a.metadata.updatedAtDatetime.toMillis()
                  );
                });
              });
            });
          });

          // Unsubscribe from the listener when the cache entry is removed
          await cacheEntryRemoved;
          unsubscribe();
        } catch (error) {
          console.error("Firestore trns streaming failed:", error);
        }
      },
    }),
    getTrnById: builder.query({
      queryFn: async (id) => {
        try {
          const docRef = doc(db, "trns", id);
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
      providesTags: ["Trns"],
    }),
    createTrn: builder.mutation({
      queryFn: async ({ displayName, uid, trnData, id }) => {
        console.log(` `);
        console.log(` `);
        console.log(` `);
        console.log(`creatTrn ------------START`);
        console.log(`creatTrn ------------START`);
        console.log(`creatTrn ------------START`);

        console.log(`creatTrn creating a trn`);
        console.log(`creatTrn displayName`, displayName);
        console.log(`creatTrn uid`, uid);
        // console.log(
        //   `creatTrn queryFn trnData?.metadata`,
        //   JSON.stringify(trnData?.metadata, null, 2)
        // );
        console.log(
          `creatTrn trnData?.media`,
          JSON.stringify(trnData?.media, null, 2)
        );
        console.log(`creatTrn id`, id);

        try {
          const timestamp = Timestamp.now();
          const trnRef = doc(db, "trns", id);
          console.log(`creatTrn trnRef`, trnRef);

          const trn = {
            ...trnData,
            metadata: {
              ...trnData.metadata,
              createdAtDatetime: timestamp,
              // createdByUser: trnData?.metadata?.createdByUser,
              // createdByUid: trnData?.metadata?.createdByUid,
              updatedAtDatetime: timestamp,
              // updatedByUser: trnData?.metadata?.updatedByUser,
              // updatedByUid: trnData?.metadata?.updatedByUid,
            },
          };
          console.log(`creatTrn ------------trn`, JSON.stringify(trn, null, 2));

          const createTrnResult = await setDoc(trnRef, trn, { merge: true });
          console.log(`creatTrn createTrnResult`, createTrnResult);

          console.log(`creatTrn ------------END`);
          console.log(`creatTrn ------------END`);
          console.log(`creatTrn ------------END`);
          console.log(` `);
          console.log(` `);
          console.log(` `);

          return { data: `Trns created successfully` };
        } catch (error) {
          console.log(`creatTrn ------------Error creating trn`, error);
          return { error: error.message };
        }
      },
      // invalidatesTags: ["Trns"],
      // async onQueryStarted(args, { dispatch, queryFulfilled }) {
      //   // console.log(`args`, args);
      //   // const { id, trnData } = args;
      //   try {
      //     const fulfilled = await queryFulfilled;
      //     // console.log(`fulfilled`, fulfilled);

      //     const patchResultErfs = dispatch(
      //       erfsApi.util.invalidateTags(["Erfs"])
      //     );
      //     // console.log(`patchResultErfs`, patchResultErfs);

      //     const patchResultAsts = dispatch(
      //       astsApi.util.invalidateTags(["Asts"])
      //     );
      //     // console.log(`patchResultAsts`, patchResultAsts);

      //     const patchResultStores = dispatch(
      //       storesApi.util.invalidateTags(["stores"])
      //     );
      //     // console.log(`patchResultStores`, patchResultStores);
      //   } catch (error) {
      //     console.log(`error`, error);
      //   }
      // },
    }),
    updateTrn: builder.mutation({
      queryFn: async ({ displayName, uid, trnData, id }) => {
        console.log(` `);
        console.log(` `);
        console.log(` `);
        console.log(`updateTrn ------------START`);
        console.log(`updateTrn ------------START`);
        console.log(`updateTrn ------------START`);
        console.log(`updateTrn displayName`, displayName);
        console.log(`updateTrn uid`, uid);
        console.log(`updateTrn trnData`, trnData);
        console.log(
          `updateTrn trnData?.media`,
          JSON.stringify(trnData?.media, null, 2)
        );
        console.log(`updateTrn id`, id);

        try {
          const trnRef = doc(db, "trns", id);
          console.log(`updateTrn trnRef`, trnRef);

          const trn = {
            ...trnData,
            metadata: {
              ...trnData.metadata,
              updatedAtDatetime: Timestamp.now(),
              // updatedByUser: displayName,
              // updatedByUid: uid,
            },
            updateHistory: true,
          };
          console.log(`updateTrn trn`, trn);

          const updateTrnResult = await setDoc(trnRef, trn, { merge: true });
          console.log(`updateTrn updateTrnResult`, updateTrnResult);

          console.log(`updateTrn ------------END`);
          console.log(`updateTrn ------------END`);
          console.log(`updateTrn ------------END`);
          console.log(` `);
          console.log(` `);
          console.log(` `);

          return { data: `Trn updated successfully` };
        } catch (error) {
          return { error: error.message };
        }
      },
      // invalidatesTags: ["Trns"],
      // async onQueryStarted(args, { dispatch, queryFulfilled }) {
      //   // console.log(`args`, args);
      //   // const { id, trnData } = args;
      //   try {
      //     const fulfilled = await queryFulfilled;
      //     console.log(`fulfilled`, fulfilled);

      //     const patchResultErfs = dispatch(
      //       erfsApi.util.invalidateTags(["Erfs"])
      //     );
      //     console.log(`patchResultErfs`, patchResultErfs);

      //     const patchResultAsts = dispatch(
      //       astsApi.util.invalidateTags(["Asts"])
      //     );
      //     console.log(`patchResultAsts`, patchResultAsts);
      //   } catch (error) {
      //     console.log(`error`, error);
      //   }
      // },
    }),
    deleteTrn: builder.mutation({
      queryFn: async (id) => {
        // Flag the erf as deleted. Don't ever delete.
        try {
          await deleteDoc(doc(db, "trns", id));
          return { data: `Trn with id [${id}] deleted successfully` };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Trns"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        // console.log(`args`, args);
        // const { id, trnData } = args;
        try {
          const fulfilled = await queryFulfilled;
          console.log(`fulfilled`, fulfilled);

          const patchResultErfs = dispatch(
            erfsApi.util.invalidateTags(["Erfs"])
          );
          console.log(`patchResultErfs`, patchResultErfs);
        } catch (error) {
          console.log(`error`, error);
        }
      },
    }),
  }),
});
// console.log(`trnsApi`, trnsApi);

export const {
  useGetTrnsQuery,
  useGetTrnByIdQuery,
  useCreateTrnMutation,
  useUpdateTrnMutation,
  useDeleteTrnMutation,
} = trnsApi;
