import { createSlice } from '@reduxjs/toolkit'
export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        length: 0,
        cartItem: null,
        status: 0
    },
    reducers: {
        // handle Add to Card
        addToCartFetch: (state, action) => {
            state.status = action.payload
        },
        addToCartSuccess: (state, action) => {
            state.cartItem = action.payload
        },
        addToCartFailure: (state, action) => {
            state.status = action.payload
        },
        // handle 
    }
})

export const {
    addToCartFetch,
    addToCartSuccess,
    addToCartFailure
} = shopSlice.actions

export default shopSlice.reducer
