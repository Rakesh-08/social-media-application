let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    userType: {
        type: String,
        default: "CUSTOMER",
    },
    about: String,
    staysIn: String,
    Status: String,
    workAt: String,
    contact: Number,
    followers: [],
    following: [],
    posts: [],
    profilePic: String,
    coverPic: String,
        
},
    { timestamps: true });

let model= mongoose.model("users",userSchema)

module.exports = model;