import { createSlice } from '@reduxjs/toolkit';
export const homePageSlice = createSlice({
  name: 'homepage',
  initialState: {
    categories: [],
    shops: [],
    text: '',
    searchData: [],
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
  },
});

export const {
  getShopsSuccess,
  getCategoriesSuccess,
  getHomepageDataFetch,
  getHomepageDataFailure,
  getSearchSuccess,
  getSearchFetch,
} = homePageSlice.actions;

export default homePageSlice.reducer;
