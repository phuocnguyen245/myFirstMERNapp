import { createSlice } from '@reduxjs/toolkit'
export const loginpageSlice = createSlice({
    name: 'loginpage',
    initialState: {
        user: null,
        accessToken: null,
        status: 0
    },
    reducers: {
        //HomePage data
        getUserInfoFetch: (state, action) => {
            state.status = 200
        },
        getUserInfoSuccess: (state, action) => {
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
        },
    }
})

export const {
    getUserInfoFetch, getUserInfoSuccess
} = loginpageSlice.actions

export default loginpageSlice.reducer
