import mongoose from 'mongoose'
const { Schema } = mongoose
const shopSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    img:{
        type: String,
        required: true,
    },
    shopName:{
        type: String,
        unique: true,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    slug:{
        type: String,
        unique: true,
        required: true,
    }
}, {
    timestamps: true
})

export const Shops = mongoose.model('shops', shopSchema)


