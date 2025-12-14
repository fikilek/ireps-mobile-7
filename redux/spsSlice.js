import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/fbConfig"; // Adjust the import path as necessary

export const spsApi = createApi({
  reducerPath: "spsApi",
  tagTypes: ["sps"],
  // This is the base URL for your API. Adjust it according to your backend setup.
  baseQuery: fakeBaseQuery(),
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getSps: builder.query({
      queryFn: async () => {
        try {
          console.log(`running sps queryFn`);
          const q = query(
            collection(db, "serviceProviders"),
            orderBy("metadata.updatedAtDatetime", "desc")
            // where("id", "==", spId)
            // where("clients include", "==", spId)
            // limit(10)
          );
          const querySnapshot = await getDocs(q);
          const spsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // console.log(`spsList.length`, spsList.length);

          return { data: spsList };
        } catch (error) {
          console.log(`getSps Error: ${error.message} `);
          return { error: error.message };
        }
      },
      providesTags: ["sps"],
    }),
    getSpById: builder.query({
      queryFn: async ({ spId }) => {
        try {
          // console.log(`running getSpById queryFn - spId:`, spId);
          const docRef = doc(db, "serviceProviders", spId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            // console.log(`Data for sp [${docSnap.id}]: `, docSnap.data());
            return { data: { id: docSnap.id, ...docSnap.data() } };
          } else {
            return { error: "No such document!" };
          }
        } catch (error) {
          console.log(`getSpById Error: ${error.message} `);
          return { error: error.message };
        }
      },
      providesTags: ["sps"],
    }),
    createSp: builder.mutation({
      queryFn: async ({ newSpData, displayName, uid, id }) => {
        try {
          const timestamp = Timestamp.now();
          const spRef = doc(db, "serviceProviders", id);
          // console.log(`spRef`, spRef);

          const newSp = {
            ...newSpData,
            metadata: {
              ...newSpData.metadata,
              createdAtDatetime: timestamp,
              createdByUser: displayName,
              createdByUid: uid,
              updatedAtDatetime: timestamp,
              updatedByUser: displayName,
              updatedByUid: uid,
            },
            updateHistory: true,
          };
          // console.log(`newSp`, newSp);

          await setDoc(spRef, newSp, {
            merge: true,
          });
          return {
            data: `Sp [${newSpData?.tradingName}] created successfully`,
          };
        } catch (error) {
          console.log(`createSp Error: ${error.message} `);
          return { error: error.message };
        }
      },
      invalidatesTags: ["sps"],
    }),
    updateSp: builder.mutation({
      queryFn: async ({ displayName, uid, id, spData }) => {
        // console.log(`updateSp data ------------------------------------`);
        // console.log(`displayName`, displayName);
        // console.log(`uid`, uid);
        // console.log(`id`, id);
        // console.log(`spData`, spData);

        // get sp name
        // const { tradingName } = spData || {};
        try {
          const spRef = doc(db, "serviceProviders", id);
          // console.log(`spRef`, spRef);
          await setDoc(
            spRef,
            {
              ...spData,
              metadata: {
                ...spData.metadata,
                updatedAtDatetime: Timestamp.now(),
                updatedByUser: displayName,
                updatedByUid: uid,
              },
            },
            { merge: true }
          );
          return { data: `Sp [${spData?.tradingName}] updated successfully` };
        } catch (error) {
          console.log(`updateSp error: ${error.message} `);
          return { error: `Sp update error` };
        }
      },
      invalidatesTags: ["sps"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        // console.log(`args`, args);
        // const { id, trnData } = args;
        try {
          const fulfilled = await queryFulfilled;
          // console.log(`fulfilled`, fulfilled);

          const patchResultErfs = dispatch(spsApi.util.invalidateTags(["sps"]));
          // console.log(`patchResultErfs`, patchResultErfs);
        } catch (error) {
          console.log(`updateSp Error: ${error.message} `);
          console.log(`error`, error);
        }
      },
    }),
    deleteSp: builder.mutation({
      queryFn: async (id) => {
        // Flag the sp as deleted. Don't ever delete.
        try {
          await deleteDoc(doc(db, "sps", id));
          return { data: `Sp with id [${id}] deleted successfully` };
        } catch (error) {
          console.log(`deleteSp Error: ${error.message} `);
          return { error: error.message };
        }
      },
      invalidatesTags: ["sps"],
    }),
  }),
});
// console.log(`spsApi`, spsApi);

export const {
  useGetSpsQuery,
  useGetSpByIdQuery,
  useCreateSpMutation,
  useUpdateSpMutation,
  useDeleteSpMutation,
} = spsApi;
