let mongoose = require("mongoose");

let notificationSchema = new mongoose.Schema({

    from: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    To: {
        type: [mongoose.SchemaTypes.ObjectId],
        required: true
    },
    msg: {
        type: String,
        required:true
    },
    seen:[],
    senderImage:String

},{timestamps:true});

let model = mongoose.model("notifications", notificationSchema);
module.exports = model;