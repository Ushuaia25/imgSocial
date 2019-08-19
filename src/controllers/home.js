const ctrl = {}; //esto es un objeto. Un controlador es un objeto con funciones para exportar

const { Image } = require('../models');

const sidebar = require('../helpers/sidebar');

ctrl.index = async(req,res) => {
    const images = await Image.find().sort({timestamp:1});//Queremos las imagenes ordenadas por el tiempo de creación ascendente, por eso ponemos 1
    let viewModel = {images:[]};//Lo inicializamos vacío
    viewModel.images = images;
    viewModel = await sidebar(viewModel);//Cargamos los datos al viewModel y lo almacenamos en el propio viewModel
    res.render('index',viewModel); //Quitamos {images} y le metemos el viewModel
};

module.exports = ctrl; 