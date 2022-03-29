import mongoose from 'mongoose'
const { Schema } = mongoose
const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        required: true,
        type: String,
    },
    address:{
        type: String,
    },
    role: {
        type: String,
    },
}, {
    timestamps: true
})

export const Users = mongoose.model('users', userSchema)


