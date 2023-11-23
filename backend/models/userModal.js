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
        required: true
    },
    userType: {
        type: String,
        default: "CUSTOMER",
    },
    about: String,
    staysIn: String,
    relationshipStatus: String,
    workAt: String,
    contact: Number,
    followers: [],
    following:[],
    profilePic: String,
    coverPic: String,
        
},
    { timestamps: true });

let model= mongoose.model("users",userSchema)

module.exports = model;