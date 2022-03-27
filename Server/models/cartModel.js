import mongoose from 'mongoose'
const { Schema } = mongoose
const cartItem = new Schema({
    product_ID: {
        type: Object,
        require: true
    },
    user_ID: {
        type: Schema.Types.ObjectId,
        require: true
    },
    qty: {
        type: Number,
        require: true
    }
}, {
    timestamps: true
})

export const CartItem = mongoose.model('cartItem', cartItem)


