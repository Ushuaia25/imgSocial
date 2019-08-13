const path = require('path'); //lo usaremos para extraer la extensión de un nombre
const {randomNumber} = require('../helpers/libs'); //Importamos solo esa función en vez de toda la Biblioteca
const fs = require('fs-extra');
//const Image = require('../models/image'); //Importo el modelo que hemos creado
//const {Image} = require('../models/index'); //Usamos esto de index para coger todos los modelos de a una pero luego cogemos solo el de Image que es el que vamos a usar ahora
const {Image, Comment} = require('../models');//esto es lo mismo que el anterior porque por defecto busca index
const md5 = require('md5');

const ctrl = {};

ctrl.index = async (req,res) =>{
    const image = await Image.findOne({filename:{$regex: req.params.image_id}}); //Busca solo la imagen cuyo nombre sin importar la extension coincida con ese dato
    console.log(image);
    res.render('image',image);
};

ctrl.create =  (req,res) =>{ //Porque fs funciona asíncronamente para que espere

    const saveImage = async() => {
        const imgName = randomNumber();
        const images = await Image.find({filename:imgName}); //Mirame en la BBDD cuantas imagenes hay con este nombre generado
        if(images.length>0){ //Si se está repitiendo es mayor que cero
            //Aquí generaria de nuevo pero el problema es que se repita de nuevo, por eso vamos a hacer recursión.
            saveImage();
        }else{
            //console.log(req.file); //La información de la imagen estará en este objeto
            const ext = path.extname(req.file.originalname).toLowerCase(); //Extraemos la extension
            const imageTempPath = req.file.path;
            const targetPath = path.resolve(`src/public/upload/${imgName}${ext}`);

            if (ext === '.png' || ext === '.jpg' || ext === '.jpge' || ext === '.gif'){ //son los archivos que quiero aceptar
                await fs.rename(imageTempPath,targetPath);
                const newImg = new Image({
                    title: req.body.title, //de donde cogemos las cosas
                    filename: imgName + ext,
                    extension: ext,
                    description: req.body.description
                });
                const imageSaved = await newImg.save(); //Se pone await porque es asíncrono
                res.redirect('images/'+imgName);
            }else{
                await fs.unlink(imageTempPath);//Si hay fallo eliminamos la image
                res.status(500).json({error: 'Only Images are allowed'}); //Le devuelvo un json con el error
            }
        }
        
    };

    saveImage();
       
};

ctrl.like = (req,res) =>{
    
};

ctrl.comment = async (req,res) =>{
    const image = await Image.findOne({filename:{$regex: req.params.image_id}});
    if(image){
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email); //Gravatar coge una imagen por email en md5
        newComment.image_id = image._id;
        await newComment.save();
        res.redirect('/images/'+image.uniqueId);
    }
};

ctrl.remove = (req,res) =>{
    
};

module.exports = ctrl;