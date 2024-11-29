import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        //  default: 'http://localhost:5173/public/images/profile.png',
        // Default profile picture if none provided by user
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;