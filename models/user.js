const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    lastname: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 6
    },
    avatar: {
        type: [Object],
        required: false,
    },
    password: {
        type: String,
        required: true,
        min: 4
    },
    passwordConfirm: {
        type: String,
        required: true,
        min: 4
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    },
},{timestamps: true})


module.exports = mongoose.model('User', userSchema)