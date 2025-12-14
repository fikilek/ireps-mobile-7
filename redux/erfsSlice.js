import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../config/fbConfig"; // Adjust the import path as necessary

export const erfsApi = createApi({
  reducerPath: "erfsApi",
  tagTypes: ["Erfs"],
  // This is the base URL for your API. Adjust it according to your backend setup.
  baseQuery: fakeBaseQuery(),
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getErfs: builder.query({
      queryFn: (workbase) => {
        console.log(`getErfs ---- workbase`, workbase);
        return { data: [] };
      }, // Initial data fetch is not needed with onCacheEntryAdded
      keepUnusedDataFor: 3600,
      providesTags: ["Erfs"],
      async onCacheEntryAdded(
        workbase,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        console.log(`getErfs ----onCacheEntryAdded workbase`, workbase);
        if (!workbase) return;
        try {
          // Wait for the initial cache data to be loaded
          await cacheDataLoaded;
          const q = query(
            collection(db, "erfs"),
            where("address.lmMetro", "==", workbase),
            orderBy("metadata.updatedAtDatetime", "desc"),
            limit(150)
          );
          // Set up the Firestore listener
          const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              const erf = { id: change.doc?.id, ...change.doc.data() };
              // console.log(`getErfs ----snapshot erf`, erf);

              // Use updateCachedData to update the store with each change
              updateCachedData((draft) => {
                if (change.type === "added") {
                  // console.log(`getErfs ----erf added`);
                  draft.push(erf);
                } else if (change.type === "modified") {
                  const index = draft.findIndex((item) => item?.id === erf?.id);
                  if (index !== -1) {
                    console.log(`getErfs ----erf modified `);
                    draft[index] = erf;
                  }
                } else if (change.type === "removed") {
                  const index = draft.findIndex((item) => item?.id === erf?.id);
                  if (index !== -1) {
                    console.log(`getErfs ----erf removed`);
                    draft.splice(index, 1);
                  }
                }
                // sort the data in descending order by date
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
          console.error("Firestore erfs streaming failed:", error);
        }
      },
    }),
    // getErfByErfId: builder.query({
    //   // async queryFn(erfId) {
    //   //   console.log(`getErfByErfId running --------- erfId`, erfId);
    //   //   return { data: [] };
    //   // },
    //   queryFn: (erfId) => {
    //     // console.log(`getErfByErfId running --------- erfId`, erfId);
    //     return { data: [] };
    //   }, // Initial data fetch is not needed with onCacheEntryAdded

    //   providesTags: (result, error, erfId) => [{ type: "Erfs", id: erfId }],
    //   async onCacheEntryAdded(
    //     erfId,
    //     { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
    //   ) {
    //     // console.log(`onCacheEntryAdded erfId`, erfId);
    //     let unsubscribe;
    //     try {
    //       await cacheDataLoaded;

    //       const erfDocRef = doc(db, "erfs", erfId);

    //       unsubscribe = onSnapshot(erfDocRef, (snapshot) => {
    //         if (snapshot.exists()) {
    //           updateCachedData((draft) => {
    //             console.log(`onSnapshot draft`, draft);
    //             Object.assign(draft, {
    //               id: snapshot.id,
    //               ...snapshot.data(),
    //             });
    //           });
    //         } else {
    //           updateCachedData((draft) => null);
    //         }
    //       });
    //     } catch (error) {
    //       console.error("Error setting up erf listener:", error);
    //     }

    //     await cacheEntryRemoved;
    //     if (unsubscribe) unsubscribe();
    //   },
    // }),
    // getErfById: builder.query({
    //   queryFn: (id) => {
    //     console.log(`getErfById ----id`, id);
    //     return { data: [] };
    //   }, // Initial data fetch is not needed with onCacheEntryAdded

    //   providesTags: ["Erfs"],
    //   async onCacheEntryAdded(
    //     arg,
    //     { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
    //   ) {
    //     console.log(`getErfById ----onCacheEntryAdded arg`, arg);
    //     // const { id } = arg;
    //     if (!arg) return;
    //     console.log(`getErfById ----onCacheEntryAdded arg`, arg);
    //     try {
    //       // Wait for the initial cache data to be loaded
    //       await cacheDataLoaded;
    //       const docRef = doc(db, "erfs", arg);
    //       // Set up the Firestore listener
    //       const unsubscribe = onSnapshot(docRef, (doc) => {
    //         console.log(`getErfById -----doc`, doc);
    //         const erf = { id: doc?.id, ...doc.data() };
    //         // console.log(`getErfById snapshot erf`, erf);
    //         console.log(
    //           `getErfByErfId ----snapshot erf`,
    //           JSON.stringify(erf, null, 2)
    //         );

    //         // Use updateCachedData to update the store with each change
    //         updateCachedData((draft) => {
    //           console.log(`getErfByErfId ----draft`, draft);
    //           const index = draft.findIndex((item) => item?.id === erf?.id);
    //           if (index !== -1) {
    //             console.log(`getErfByErfId ----erf modified`);
    //             draft[index] = erf;
    //           }
    //         });
    //       });

    //       // Unsubscribe from the listener when the cache entry is removed
    //       await cacheEntryRemoved;
    //       unsubscribe();
    //     } catch (error) {
    //       console.error("Firestore erfs streaming failed:", error);
    //     }
    //   },
    // }),
    getErfById: builder.query({
      queryFn: async (id) => {
        console.log(`getErfById ----id`, id);
        try {
          const docRef = doc(db, "erfs", id);
          console.log(`getErfById ----docRef`, docRef);

          const docSnap = await getDoc(docRef);
          console.log(`getErfById ----docSnap`, docSnap);

          if (docSnap.exists()) {
            console.log(
              `getErfById ----docSnap exist - dcoSnap.id`,
              docSnap.id
            );
            return { data: { id: docSnap.id, ...docSnap.data() } };
          } else {
            console.log(
              `getErfById ----docSnap does NOT exit - dcoSnap.id`,
              docSnap.id
            );
            return { error: "No such document!" };
          }
        } catch (error) {
          console.log(`getErfById ----Get Erf by id failure`, error);
          return { error: error.message };
        }
      },
      // providesTags: (result, error, id) => [{ type: "Erfs", id }],
    }),
    createErf: builder.mutation({
      queryFn: async ({ newErfData, displayName, uid, id }) => {
        console.log(`createErf ----newErfData`, newErfData);
        console.log(`createErf ----displayName`, displayName);
        console.log(`createErf ----uid`, uid);
        console.log(`createErf ----id`, id);
        try {
          const timestamp = Timestamp.now();
          const erfRef = doc(db, "erfs", id);
          // console.log(`erfRef`, erfRef);

          const newErf = {
            ...newErfData,
            metadata: {
              ...newErfData.metadata,
              createdAtDatetime: timestamp,
              createdByUser: displayName,
              createdByUid: uid,
              updatedAtDatetime: timestamp,
              updatedByUser: displayName,
              updatedByUid: uid,
            },
          };
          console.log(
            `createErf ----newErfData`,
            JSON.stringify(newErfData, null, 2)
          );

          await setDoc(erfRef, newErf, {
            merge: true,
          });

          return { data: `Erf [${newErfData?.erfNo}] created successfully` };
        } catch (error) {
          console.log(`createErf ----error`, error);
          return { error: error.message };
        }
      },
      // invalidatesTags: [{ type: "Erfs", id: "ERFS_LIST" }],
    }),
    updateErf: builder.mutation({
      queryFn: async ({ displayName, uid, id, erfData, erfNo }) => {
        try {
          console.log(` `);
          console.log(` `);
          console.log(`updateErf ----START START `);
          console.log(`updateErf ----START START `);

          console.log(`updateErf ----displayName`, displayName);
          console.log(`updateErf ----uid`, uid);
          console.log(`updateErf ----id`, id);
          console.log(`updateErf ----erfData`, erfData);

          const erfRef = doc(db, "erfs", id);
          console.log(`updateErf ----erfRef`, erfRef);
          const updateErfResut = await setDoc(
            erfRef,
            {
              ...erfData,
              metadata: {
                updatedAtDatetime: Timestamp.now(),
                updatedByUser: displayName,
                updatedByUid: uid,
              },
            },
            { merge: true }
          );
          console.log(`updateErf ----updateErfResut`, updateErfResut);

          console.log(`updateErf ----END END`);
          console.log(`updateErf ----END END`);
          console.log(` `);
          console.log(` `);

          return { data: `Erfs [${erfNo}] updated successfully` };
        } catch (error) {
          console.log(`updateErf ----error: `, error.message);
          return { error: error.message };
        }
      },
      // invalidatesTags: (result, error, { id }) => [
      //   { type: "Erfs", id },
      //   { type: "Erfs", id: "ERFS_LIST" },
      // ],
    }),
    // updateErfMedia: builder.mutation({
    //   queryFn: async ({ displayName, uid, id, erfMediaData, erfNo }) => {
    //     try {
    //       // console.log(`updateErf data ------------------------------------`);
    //       // console.log(`displayName`, displayName);
    //       // console.log(`uid`, uid);
    //       // console.log(`id`, id);
    //       // console.log(`erfData`, erfData);
    //       const erfRef = doc(db, "erfs", id);
    //       // console.log(`erfRef`, erfRef);
    //       const updateErfMediaResult = await updateDoc(erfRef, {
    //         media: arrayUnion(erfMediaData),
    //         "metadata.updatedAtDatetime": Timestamp.now(),
    //         "metadata.updatedByUser": displayName,
    //         "metadata.updatedByUid": uid,
    //       });
    //       // console.log(
    //       //   `updateErfMediaResult------------------------------`,
    //       //   updateErfMediaResult
    //       // );

    //       return { data: `Erf [${erfNo}] updated successfully with media` };
    //     } catch (error) {
    //       console.log(`Error updating erf with media: `, error.message);
    //       return { error: error.message };
    //     }
    //   },
    //   invalidatesTags: (result, error, { id }) => [
    //     { type: "Erfs", id },
    //     { type: "Erfs", id: "ERFS_LIST" },
    //   ],
    // }),
    // deleteErf: builder.mutation({
    //   queryFn: async (id) => {
    //     // Flag the erf as deleted. Don't ever delete.
    //     try {
    //       await deleteDoc(doc(db, "erfs", id));
    //       return { data: `Erf with id [${id}] deleted successfully` };
    //     } catch (error) {
    //       return { error: error.message };
    //     }
    //   },
    //   invalidatesTags: (result, error, { id }) => [
    //     { type: "Erfs", id },
    //     { type: "Erfs", id: "ERFS_LIST" },
    //   ],
    // }),
  }),
});
// console.log(`erfsApi`, erfsApi);

export const {
  useGetErfsQuery,
  useGetErfByIdQuery,
  useCreateErfMutation,
  useUpdateErfMutation,
} = erfsApi;
