import mongoose from 'mongoose'
const { Schema } = mongoose
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        unique: false,
    },
    email: {
        required: true,
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    tel: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user'
    },

}, {
    timestamps: true
})

export const Users = mongoose.model('users', userSchema)


