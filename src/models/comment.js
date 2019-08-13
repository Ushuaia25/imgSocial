const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const ObjectId = Schema.ObjectId;

const CommentSchema = new Schema({
    image_id: { type:String },
    email: { type:String },
    name: { type:String },
    comment: { type:String },
    timestamp: { type:Date, default:Date.now },
    gravatar: { type:String }
});

module.exports = model('comment', CommentSchema);