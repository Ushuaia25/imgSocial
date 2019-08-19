const express = require('express');
const router = express.Router(); //vamos a usar el enrutador de express. Nos permite definir urls del servidor

const home = require('../controllers/home');
const image = require('../controllers/image');

module.exports = app =>{

    
    // app.get('/',(req,res) =>{
    //     res.render('index'); //no tengo que decirle que tengo que mirar main.hbs porque eso está en server config. Cargará index pero con la info del layout main
    // });

    router.get('/',home.index); //Con esto el código es más limpio. Index esta en controlador/home
    router.get('/images/:image_id',image.index); //:image_id es una variable en la ruta
    router.post('/images',image.create); //Con Post podrán subir imágenes
    router.post('/images/:image_id/like',image.like); //Cuando el usuario haga un like
    router.post('/images/:image_id/comment',image.comment);
    router.delete('/images/:image_id',image.remove);

    app.use(router);

}