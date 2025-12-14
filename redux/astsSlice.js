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
  where,
} from "firebase/firestore";
import { db } from "../config/fbConfig"; // Adjust the import path as necessary

const timestamp = Timestamp.now();
export const astsApi = createApi({
  reducerPath: "astsApi",
  tagTypes: ["Asts"],
  baseQuery: fakeBaseQuery(),
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getAsts: builder.query({
      queryFn: async ({ lmMetro }) => {
        try {
          console.log(`running asts queryFn`, lmMetro);
          // console.log(`lmMetro`, lmMetro);
          const q = query(
            collection(db, "asts"),
            orderBy("metadata.updatedAtDatetime", "desc"),
            where("erf.address.lmMetro", "==", lmMetro)
            // where("ast.astData.astState.state", "==", "checkedOut"),
            // limit(20)
          );

          const querySnapshot = await getDocs(q);
          const astsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // console.log(`astsList`, astsList);
          return { data: astsList };

          // return new Promise((resolve) => {
          // 	const unsubscribe = onSnapshot(
          // 		q,
          // 		(querySnapshot) => {
          // 			const astsList = querySnapshot.docs.map((doc) => ({
          // 				id: doc.id,
          // 				...doc.data(),
          // 			}));
          // 			// console.log(`astsList`, astsList);
          // 			resolve({ data: astsList });
          // 		},
          // 		(error) => {
          // 			resolve({ error });
          // 		}
          // 	);
          // 	// Return a cleanup function to unsubscribe when the component unmounts
          // 	return () => unsubscribe();
          // });
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: ["Asts"],
    }),
    getAstsBySp: builder.query({
      queryFn: async ({ spId }) => {
        try {
          console.log(`running asts queryFn by sp`);
          // console.log(` getAstsBySp spId: `, spId);
          const q = query(
            collection(db, "asts"),
            orderBy("metadata.updatedAtDatetime", "desc"),
            where("astSp.id", "==", spId) // spId will be in an array
            // where("astSp.id", "==", "rste12") // spId will be in an array
            // limit(15)
          );

          const querySnapshot = await getDocs(q);
          const astsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // console.log(
          //   `getAstsBySp spId [${spId}] astsList?.length`,
          //   astsList?.length
          // );
          return { data: astsList };
        } catch (error) {
          console.log(`Error getting asts: ${error.message} `);
          return { error: error.message };
        }
      },
      providesTags: ["Asts"],
    }),
    getAstsByAstState: builder.query({
      queryFn: async ({ spId }) => {
        try {
          console.log(`running getAstsByAstState queryFn by astState`);
          console.log(` getAstsByAstState spId: `, spId);
          const q = query(
            collection(db, "asts"),
            orderBy("metadata.updatedAtDatetime", "desc"),
            where("astData.astState.id", "==", spId) // spId will be in an array
            // where("astSp.id", "==", "rste12") // spId will be in an array
            // limit(15)
          );

          const querySnapshot = await getDocs(q);
          const astsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(
            `getAstsByAstState spId [${spId}] astsList?.length`,
            astsList?.length
          );
          return { data: astsList };
        } catch (error) {
          console.log(`Error getting asts: ${error.message} `);
          return { error: error.message };
        }
      },
      providesTags: ["Asts"],
    }),
    getAstById: builder.query({
      queryFn: async (id) => {
        try {
          const docRef = doc(db, "asts", id);
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
      providesTags: ["Asts"],
    }),
    updateAst: builder.mutation({
      queryFn: async ({ displayName, uid, id, astData, astNo }) => {
        try {
          // console.log(`updateErf data ------------------------------------`);
          // console.log(`displayName`, displayName);
          // console.log(`uid`, uid);
          // console.log(`id`, id);
          // console.log(`erfData`, erfData);
          const astRef = doc(db, "asts", id);
          await setDoc(
            astRef,
            {
              ...astData,
              metadata: {
                updatedAtDatetime: timestamp,
                updatedByUser: displayName,
                updatedByUid: uid,
              },
            },
            { merge: true }
          );
          return { data: `Asts [${astNo}] updated successfully` };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Asts"],
    }),
    updateAstMedia: builder.mutation({
      queryFn: async ({ displayName, uid, id, astData, astNo }) => {
        try {
          // console.log(`updateErf data ------------------------------------`);
          // console.log(`displayName`, displayName);
          // console.log(`uid`, uid);
          // console.log(`id`, id);
          // console.log(`erfData`, erfData);
          const astRef = doc(db, "asts", id);
          await setDoc(
            astRef,
            {
              ...astData,
              metadata: {
                updatedAtDatetime: timestamp,
                updatedByUser: displayName,
                updatedByUid: uid,
              },
            },
            { merge: true }
          );
          return { data: `Asts [${astNo}] updated successfully` };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Asts"],
    }),
    deleteAst: builder.mutation({
      queryFn: async (id) => {
        // Flag the erf as deleted. Don't ever delete.
        try {
          await deleteDoc(doc(db, "asts", id));
          return { data: `Erf with id [${id}] deleted successfully` };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Asts"],
    }),
  }),
});
// console.log(`astsApi`, astsApi);

export const {
  useGetAstsQuery,
  useGetAstsBySpQuery,
  useGetAstsByAstStateQuery,
  useLazyGetAstsBySpQuery,
  useGetAstByIdQuery,
  useUpdateAstMutation,
  useUpdateAstMediaMutation,
  useDeleteAstMutation,
} = astsApi;
