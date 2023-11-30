let mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
    
    postId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref:"posts"
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "users"
    },
    username: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    likes: [],
    dislikes: [],
    reply:[],

}, {
    timestamps:true
})

let model = mongoose.model('Comment', commentSchema);
module.exports =model