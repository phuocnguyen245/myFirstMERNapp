import { createSlice } from '@reduxjs/toolkit'
export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        status: 0
    },
    reducers: {
        //Change Qty
        putShopQtyFetch: (state, action) => {
            state.status = action.payload
        },
        putShopQtySuccess: (state, action) => {
            state.status = action.payload
        },
        putShopQtyFailure: (state, action) => {
            state.status = action.payload
        },
        //handle Delete
        deleteCartItemFetch: (state, action) => {
            state.status = action.payload
        },
        deleteCartItemSuccess: (state, action) => {
            state.status = action.payload
        },
        deleteCartItemFailure: (state, action) => {
            state.status = action.payload
        }
    }
})

export const {
    putShopQtyFetch,
    putShopQtySuccess,
    putShopQtyFailure,
    deleteCartItemFetch,
    deleteCartItemSuccess,
    deleteCartItemFailure
} = cartSlice.actions

export default cartSlice.reducer
