let mongoose = require('mongoose');


let postSchema = new mongoose.Schema({
       
    userId: {
        type: mongoose.SchemaType.ObjectId,
        required:true
    },
    imgPost: String,
    likes: [],
    comments: [{}],
    desc: String
},
    { timestamps: true });

let model= mongoose.model("posts",postSchema)



