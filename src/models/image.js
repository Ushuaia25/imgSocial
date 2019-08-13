const mongoose = require('mongoose');
const { Schema } = mongoose; //Te permite crear un esquema de un nuevo tipo de dato. Me traigo Schema de mongoose
const path = require('path');

const ImageSchema = new Schema({
    title: { type:String },
    description: { type:String },
    filename: { type:String },
    extension: { type:String },
    likes: { type:Number, default:0 },
    views: { type:Number, default:0},
    timestamp: { type:Date, default:Date.now}
});

ImageSchema.virtual('uniqueId') //Cuando pida uniqueId me devolverá el nombre sin extensión
    .get(function(){
        return path.parse(this.filename).name;; //No quiero el nombre completo. Le quito la extensión al filename
    });

module.exports = mongoose.model('Image',ImageSchema); //Estoy creando un nuevo modelo de Imagen que va a tomar el esquema ImageSchema