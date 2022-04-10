import { createSlice } from '@reduxjs/toolkit';
export const homePageSlice = createSlice({
  name: 'homepage',
  initialState: {
    categories: [],
    shops: [],
    text: '',
    searchData: [],
    load: false,
    height: 0
  },
  reducers: {
    //HomePage data
    getCategoriesSuccess: (state, action) => {
      state.categories = action.payload.categories;
    },
    getShopsSuccess: (state, action) => {
      state.shops = action.payload.shops;
    },
    getHomepageDataFetch: (state, action) => {
      state.text = action.payload;
    },
    getHomepageDataFailure: (state, action) => {},
    getSearchFetch: (state, action) => {
      state.text = action.payload;
    },
    getSearchSuccess: (state, action) => {
      state.searchData = action.payload;
    },
    //load More
    isLoad: (state, action) => {
      state.load = action.payload;
    },
    getHeight : (state, action) => {
      state.height = action.payload
    }
  },
});

export const {
  getShopsSuccess,
  getCategoriesSuccess,
  getHomepageDataFetch,
  getHomepageDataFailure,
  getSearchSuccess,
  getSearchFetch,
  isLoad,
  getHeight,
} = homePageSlice.actions;

export default homePageSlice.reducer;
