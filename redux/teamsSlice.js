import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import {
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

export const teamsApi = createApi({
  reducerPath: "teamsApi",
  tagTypes: ["teams"],
  // This is the base URL for your API. Adjust it according to your backend setup.
  baseQuery: fakeBaseQuery(),
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getTeams: builder.query({
      queryFn: () => {
        console.log(`getTeams running ---------`);
        return { data: [] };
      }, // Initial data fetch is not needed with onCacheEntryAdded
      providesTags: ["teams"],
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        // console.log(`onCacheEntryAdded arg`, arg);
        try {
          // Wait for the initial cache data to be loaded
          await cacheDataLoaded;
          // Set up the Firestore listener
          const teamsRef = collection(db, "teams");
          const unsubscribe = onSnapshot(teamsRef, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              const team = { id: change.doc?.id, ...change.doc.data() };
              // console.log(`snapshot team`, team);

              // Use updateCachedData to update the store with each change
              updateCachedData((draft) => {
                // console.log(`draft`, draft);
                if (change.type === "added") {
                  // console.log(`team added`);
                  draft.push(team);
                } else if (change.type === "modified") {
                  const index = draft.findIndex(
                    (item) => item?.id === team?.id
                  );
                  if (index !== -1) {
                    // console.log(`team modified`);
                    draft[index] = team;
                  }
                } else if (change.type === "removed") {
                  const index = draft.findIndex(
                    (item) => item?.id === team?.id
                  );
                  if (index !== -1) {
                    // console.log(`team removed`);
                    draft.splice(index, 1);
                  }
                }
              });
            });
          });

          // Unsubscribe from the listener when the cache entry is removed
          await cacheEntryRemoved;
          unsubscribe();
        } catch (error) {
          console.error("Firestore teams streaming failed:", error);
        }
      },
    }),
    getTeamsByOwnerId: builder.query({
      queryFn: (spId) => {
        // console.log(`queryFn owner spId`, spId);
        return { data: [] };
      }, // Initial data fetch is not needed with onCacheEntryAdded
      providesTags: ["teams"],
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        // console.log(`onCacheEntryAdded arg`, arg);
        try {
          // Wait for the initial cache data to be loaded
          await cacheDataLoaded;

          // Set up the Firestore listener
          const q = query(
            collection(db, "teams"),
            orderBy("metadata.updatedAtDatetime", "desc"),
            where("teamOwner.id", "==", arg?.trim())
            // limit(10)
          );
          const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              const team = { id: change.doc?.id, ...change.doc.data() };
              // console.log(`team`, team);

              // Use updateCachedData to update the store with each change
              updateCachedData((draft) => {
                if (change.type === "added") {
                  draft.push(team);
                } else if (change.type === "modified") {
                  const index = draft.findIndex(
                    (item) => item?.id === team?.id
                  );
                  if (index !== -1) {
                    draft[index] = team;
                  }
                } else if (change.type === "removed") {
                  const index = draft.findIndex(
                    (item) => item?.id === team?.id
                  );
                  if (index !== -1) {
                    draft.splice(index, 1);
                  }
                }
              });
            });
          });

          // Unsubscribe from the listener when the cache entry is removed
          await cacheEntryRemoved;
          unsubscribe();
        } catch (error) {
          console.error("Firestore teams streaming failed:", error);
        }
      },
    }),
    getTeamByTeamId: builder.query({
      queryFn: async (id) => {
        try {
          const docRef = doc(db, "teams", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            return { data: { id: docSnap?.id, ...docSnap.data() } };
          } else {
            return { error: "No such document!" };
          }
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: ["teams"],
    }),
    createTeam: builder.mutation({
      queryFn: async ({ newTeamData, displayName, uid, id }) => {
        try {
          const timestamp = Timestamp.now();
          const teamRef = doc(db, "teams", id);
          // console.log(`teamRef`, teamRef);

          const newTeam = {
            ...newTeamData,
            metadata: {
              ...newTeamData.metadata,
              createdAtDatetime: timestamp,
              createdByUser: displayName,
              createdByUid: uid,
              updatedAtDatetime: timestamp,
              updatedByUser: displayName,
              updatedByUid: uid,
            },
            updateHistory: true,
          };
          // console.log(`newTeam`, newTeam);

          await setDoc(teamRef, newTeam, {
            merge: true,
          });
          return {
            data: `Team [${newTeamData?.name}] created successfully`,
          };
        } catch (error) {
          console.log(
            `Team [${newTeamData?.name}] create error: ${error.message} `
          );
          return { error: error.message };
        }
      },
      // invalidatesTags: ["teams"],
    }),
    updateTeam: builder.mutation({
      queryFn: async ({ displayName, uid, id, teamData }) => {
        // console.log(`team data ------------------------------------`);
        // console.log(`displayName`, displayName);
        // console.log(`uid`, uid);
        // console.log(`id`, id);
        // console.log(`teamData`, teamData);

        // get store name
        const { teamName } = teamData || {};
        try {
          const storeRef = doc(db, "teams", id);
          // console.log(`storeRef`, storeRef);
          await setDoc(
            storeRef,
            {
              ...teamData,
              metadata: {
                ...teamData.metadata,
                updatedAtDatetime: Timestamp.now(),
                updatedByUser: displayName,
                updatedByUid: uid,
              },
            },
            { merge: true }
          );
          return { data: `Team [${teamName}] updated successfully` };
        } catch (error) {
          console.log(`Team update error: ${error.message} `);
          return { error: `Team update error` };
        }
      },
      // invalidatesTags: ["teams"],
    }),
    deleteTeam: builder.mutation({
      queryFn: async (id, name) => {
        // Flag the store as deleted. Don't ever delete.
        console.log(`deleteTeam id`, id);
        try {
          await deleteDoc(doc(db, "teams", id));
          return { data: `Team [${name}] deleted successfully` };
        } catch (error) {
          console.log(`Delete team error: ${error.message} `);
          return { error: error.message };
        }
      },
      // invalidatesTags: ["teams"],
    }),
  }),
});
// console.log(`teamsApi`, teamsApi);

export const {
  useGetTeamsQuery,
  useGetTeamsByOwnerIdQuery,
  useGetTeamByTeamIdQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamsApi;
