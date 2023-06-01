import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  products: [],
  dataName: "",
  order: [],
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    listUsers: (state, action) => {
      state.user = action.payload;
    },
    listProducts: (state, action) => {
      state.products = action.payload;
    },
    nameUser: (state, action) => {
      state.dataName = action.payload;
    },
    listOrders: (state, action) => {
      state.order = action.payload;
    }
  },
});

export const { listUsers, listProducts, nameUser, listOrders } = storeSlice.actions;

export default storeSlice.reducer;
