import { createSlice } from '@reduxjs/toolkit'
export const homePageSlice = createSlice({
    name: 'homepage',
    initialState: {
        data: [],
        isLoading: false
    },
    reducers: {
        getHomepageDataSuccess: (state, action) => {
            state.data = action.payload
            state.isLoading = false
        },
        getHomepageDataFetch: (state, action) => {
            state.isLoading= true
        },
        getHomepageDataFailure: (state, action) => {
            state.isLoading= false
        }
    }
})

export const { getHomepageDataSuccess, getHomepageDataFetch, getHomepageDataFailure  } = homePageSlice.actions
export default homePageSlice.reducer
