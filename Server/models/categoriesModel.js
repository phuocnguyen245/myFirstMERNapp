import mongoose from 'mongoose'
const { Schema } = mongoose
const categorySchema = new Schema({
    name: {
        type: String,
        max: 255,
        require: true
    },
    slug: {
        type: String,
        unique: true
    },
}, {
    timestamps: true
})

export const Categories = mongoose.model('Categories', categorySchema)


