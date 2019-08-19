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

CommentSchema.virtual('image')
    .set(function (image){
        this._image = image;
    })
    .get(function(){
        return this._image;
    })

module.exports = model('comment', CommentSchema);