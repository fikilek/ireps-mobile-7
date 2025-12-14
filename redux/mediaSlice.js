import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/fbConfig"; // Adjust the import path as necessary

export const mediaApi = createApi({
  reducerPath: "mediaApi",
  tagTypes: ["Media"],
  // This is the base URL for your API. Adjust it according to your backend setup.
  baseQuery: fakeBaseQuery(),
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getMedia: builder.query({
      queryFn: (workbase) => {
        // console.log(`getErfs running --------- workbase`, workbase);
        return { data: [] };
      }, // Initial data fetch is not needed with onCacheEntryAdded
      providesTags: ["Media"],
      async onCacheEntryAdded(
        workbase,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        // console.log(`onCacheEntryAdded workbase`, workbase);
        try {
          // Wait for the initial cache data to be loaded
          await cacheDataLoaded;
          // Set up the Firestore listener
          const q = query(
            collection(db, "media"),
            where("metadata.workbase", "==", workbase),
            orderBy("metadata.createdAtDatetime", "desc"),
            limit(15)
          );
          const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              const team = { id: change.doc?.id, ...change.doc.data() };
              // console.log(`snapshot team`, team);

              // Use updateCachedData to update the store with each change
              updateCachedData((draft) => {
                // console.log(`draft`, draft);
                if (change.type === "added") {
                  console.log(`media added`);
                  draft.push(team);
                } else if (change.type === "modified") {
                  const index = draft.findIndex(
                    (item) => item?.id === team?.id
                  );
                  if (index !== -1) {
                    console.log(`media modified`);
                    draft[index] = team;
                  }
                } else if (change.type === "removed") {
                  const index = draft.findIndex(
                    (item) => item?.id === team?.id
                  );
                  if (index !== -1) {
                    console.log(`mediatrn removed`);
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
          console.error("Firestore media streaming failed:", error);
        }
      },
    }),
    getMediaByMediaId: builder.query({
      queryFn: async (mediaId) => {
        try {
          const docRef = doc(db, "media", mediaId);
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
      providesTags: ["Media"],
    }),
    getMediaByTrnId: builder.query({
      queryFn: async (trnId) => {
        try {
          const mediaRef = collection(db, "media");
          const q = query(mediaRef, where("metadata.trnId", "==", trnId));

          // 2. Execute the query
          const querySnapshot = await getDocs(q);
          if (querySnapshot.exists()) {
            return { data: { id: querySnapshot.id, ...querySnapshot.data() } };
          } else {
            return { error: "No such document!" };
          }
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: ["Media"],
    }),
    getMediaByErfId: builder.query({
      queryFn: async (ErfId) => {
        try {
          const mediaRef = collection(db, "media");
          const q = query(mediaRef, where("metadata.erfId", "==", ErfId));

          // 2. Execute the query
          const querySnapshot = await getDocs(q);
          if (querySnapshot.exists()) {
            return { data: { id: querySnapshot.id, ...querySnapshot.data() } };
          } else {
            return { error: "No such document!" };
          }
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: ["Media"],
    }),
    deleteMedia: builder.mutation({
      queryFn: async (id) => {
        // Flag the erf as deleted. Don't ever delete.
        try {
          await deleteDoc(doc(db, "media", id));
          return { data: `Media deleted successfully` };
        } catch (error) {
          return { error: `Error deleting media - ${error.message}` };
        }
      },
      // invalidatesTags: ["Media"],
    }),
  }),
});
// console.log(`mediaErfsApi`, mediaErfsApi);

export const {
  useGetMediaQuery,
  useGetMediaByMedaiIdQuery,
  useGetMediaByTrnIdQuery,
  useGetMediaByErfIdQuery,
  useDeleteMediaMutation,
} = mediaApi;
