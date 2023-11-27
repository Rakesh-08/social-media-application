let mongoose = require('mongoose');


let postSchema = new mongoose.Schema({
       
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required:true
    },
    imgPost: String,
    likes: [],
    comments: [{}],
    desc: String,
    username: String,
    profilePic: String
},
    { timestamps: true });

let model= mongoose.model("posts",postSchema)


module.exports = model;


