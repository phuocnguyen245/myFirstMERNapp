import { createSlice } from '@reduxjs/toolkit';
export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    length: 0,
    cartItems: null,
    status: 0,
    total: 0,
    initLength: 0,
    userData: {},
  },
  reducers: {
    // handle Add to Card
    addToCartFetch: (state, action) => {
      state.status = action.payload;
    },
    addToCartSuccess: (state, action) => {
      state.length = action.payload.length;
    },
    addToCartFailure: (state, action) => {
      state.status = action.payload;
    },
    getCartItemFetch: (state, action) => {
      state.status = action.payload;
    },
    getCartItemSuccess: (state, action) => {
      state.length = action.payload.length;
      state.cartItems = action.payload.data;
      state.total = action.payload.total;
      state.initLength = action.payload.initLength;
      state.userData = action.payload.userData;
    },
    getCartItemFailure: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const {
  addToCartFetch,
  addToCartSuccess,
  addToCartFailure,
  //
  getCartItemFetch,
  getCartItemSuccess,
  getCartItemFailure,
} = shopSlice.actions;

export default shopSlice.reducer;
