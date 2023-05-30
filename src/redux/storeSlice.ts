import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    listUsers: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { listUsers } = storeSlice.actions;

export default storeSlice.reducer;
