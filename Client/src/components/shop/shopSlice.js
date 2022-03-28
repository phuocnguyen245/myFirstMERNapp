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
            state.length = action.payload.length
        },
        addToCartFailure: (state, action) => {
            state.status = action.payload
        },
        getCartItemFetch: (state, action) => {
            state.status = action.payload
        },
        getCartItemSuccess: (state, action) => {
            state.length = action.payload.length
            state.cartItem = action.payload
        },
        getCartItemFailure: (state, action) => {
            state.status = action.payload
        }
    }
})

export const {
    addToCartFetch,
    addToCartSuccess,
    addToCartFailure,
    //
    getCartItemFetch,
    getCartItemSuccess,
    getCartItemFailure
} = shopSlice.actions

export default shopSlice.reducer
