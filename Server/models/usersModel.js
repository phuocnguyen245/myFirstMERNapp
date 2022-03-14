import mongoose from 'mongoose'
const { Schema } = mongoose
const userSchema = new Schema({
    username:{
        type: String,
        unique: true
    },
    password:{
        type: String,
    },
    email:{
        type: String,
    },
    role: {
        type: String,
    },
}, {
    timestamps: true
})

export const Users = mongoose.model('users', userSchema)


