// offlineFormsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pendingForms: [], // Array to store pending form data
};

const offlineSlice = createSlice({
  name: "offline",
  initialState, // Array to hold pending form submissions
  reducers: {
    addPendingForm: (state, action) => {
      console.log(`offlineSlice -- Adding pending form - state`, state);
      console.log(`offlineSlice -- Adding pending form - action`, action);
      state.pendingForms.push(action.payload);
    },
    removePendingForm: (state, action) => {
      console.log(`offlineSlice -- Removing pending form - state`, state);
      console.log(`offlineSlice -- Removing pending form - action`, action);
      state.pendingForms = state.pendingForms.filter(
        (form) => form.id !== action.payload
      );
    },
    clearPendingForms: (state) => {
      // console.log(`createSlice -------- Clearing pending forms`);
      state.pendingForms = [];
    },
  },
});

export const { addPendingForm, removePendingForm, clearPendingForms } =
  offlineSlice.actions;
export default offlineSlice.reducer;
