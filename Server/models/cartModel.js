import mongoose from 'mongoose'
const { Schema } = mongoose
const cartItem = new Schema({
    product_ID: {
        type: Schema.Types.ObjectId,
        ref: 'shops',
        require: true
    },
    user_ID: {
        type: Schema.Types.ObjectId,
        require: true
    },
    qty: {
        type: Number,
        require: true
    },
    isCheck: {
        type: Boolean,
        default: false,
        require: true
    },
    isDetele: {
        type: Boolean,
        default: false,
        require: true
    }
}, {
    timestamps: true
})

export const CartItem = mongoose.model('cartItem', cartItem)


