import { createSelector } from "@reduxjs/toolkit";

// Select the whole cache state for the 'getErfs' query with the specific 'workbase' parameter
const selectErfsResult = (state, workbase) => {
  // console.log(`selectErfsResult running`);
  // console.log(`selectErfsResult state`, state);
  // console.log(
  //   `selectErfsResult state?.erfsApi?.queries`,
  //   JSON.stringify(state?.erfsApi?.queries, null, 2)
  // );
  // console.log(`selectErfsResult workbase`, workbase);

  // if (!state && !workbase) return;
  return state.erfsApi.queries[`getErfs("${workbase}")`]?.data; // Access the specific cache key
};

// Create a memoized selector factory to select a single erf by ID
export const selectErfById = (workbase, erfId) =>
  createSelector([(state) => selectErfsResult(state, workbase)], (erfs) =>
    erfs?.find((erf) => erf.id === erfId)
  );
