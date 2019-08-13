const ctrl = {}; //esto es un objeto. Un controlador es un objeto con funciones para exportar

const { Image } = require('../models')

ctrl.index = async(req,res) => {
    const images = await Image.find().sort({timestamp:1});//Queremos las imagenes ordenadas por el tiempo de creación ascendente, por eso ponemos 1
    res.render('index',{images});
};

module.exports = ctrl; 