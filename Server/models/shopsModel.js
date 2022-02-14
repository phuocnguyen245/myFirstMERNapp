import mongoose from 'mongoose'
const { Schema } = mongoose
const shopSchema = new Schema({
    category: {
        type: String,
    },
    img:{
        type: String,
    },
    shopName:{
        type: String,
        unique: true,
    },
    address:{
        type: String,
    },
    cost: {
        type: Number,
    },
}, {
    timestamps: true
})

export const Shops = mongoose.model('shops', shopSchema)


