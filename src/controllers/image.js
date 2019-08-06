const path = require('path'); //lo usaremos para extraer la extensión de un nombre
const {randomNumber} = require('../helpers/libs'); //Importamos solo esa función en vez de toda la Biblioteca
const fs = require('fs-extra');

const ctrl = {};

ctrl.index = (req,res) =>{

};

ctrl.create = async (req,res) =>{ //Porque fs funciona asíncronamente para que espere
    const imgName = randomNumber();
    //console.log(req.file); //La información de la imagen estará en este objeto
    const ext = path.extname(req.file.originalname).toLowerCase(); //Extraemos la extension
    const imageTempPath = req.file.path;
    const targetPath = path.resolve(`src/public/upload/${imgName}.${ext}`);

    if (ext === '.png' || ext === '.jpg' || ext === '.jpge' || ext === '.gif'){ //son los archivos que quiero aceptar
        await fs.rename(imageTempPath,targetPath);
    }
    res.send('Works!');    
};

ctrl.like = (req,res) =>{
    
};

ctrl.comment = (req,res) =>{
    
};

ctrl.remove = (req,res) =>{
    
};

module.exports = ctrl;