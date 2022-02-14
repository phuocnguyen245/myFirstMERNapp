import { createSlice } from '@reduxjs/toolkit'
export const homePageSlice = createSlice({
    name: 'homepage',
    initialState: {
        categories: [],
        shops: [],
        text:'',
        searchData: []
    },
    reducers: {
        //HomePage data
        getCategoriesSuccess: (state, action) => {
            state.categories = action.payload
        },
        getShopSuccess: (state, action) => {
            state.shops = action.payload
        },
        getHomepageDataFetch: (state, action) => {
            state.text = action.payload
        },
        getHomepageDataFailure: (state, action) => {
        },
        getSearchFetch: (state, action) => {
            state.text = action.payload
        },
        getSearchSuccess: (state, action) => {
            state.searchData = action.payload
        },
    }
})

export const {
    getShopSuccess,
    getCategoriesSuccess,
    getHomepageDataFetch,
    getHomepageDataFailure,
    getSearchSuccess,
    getSearchFetch } = homePageSlice.actions
export default homePageSlice.reducer
