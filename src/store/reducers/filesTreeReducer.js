import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "filesTree",
  initialState: {
    tree: [],
    loading: false,
    error: false,
  },
  reducers: {
    getTreeRequestStart: (state) => {
      state.loading = true;
    },
    getTreeRequestSuccess: (state, action) => {
      state.loading = false;
      state.tree = action.payload;
    },
    getTreeRequestFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getTreeRequestStart,
  getTreeRequestSuccess,
  getTreeRequestFailure,
} = counterSlice.actions;

export default counterSlice.reducer;
