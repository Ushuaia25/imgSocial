const path = require('path');
const exphbs = require('express-handlebars');

const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const errorHandler = require('errorhandler');

const routes = require('../routes/index.js');

module.exports = app => {

    //Settings 
    app.set('port',process.env.PORT || 3000); //Le digo que inicialice en un puerto. Si existe un puerto en el sistema usalo, sino el 3000
    app.set('views',path.join(__dirname,'../views')); //Con esto node sabe donde esta la carpeta views
    app.engine('.hbs',exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'),'partials'),
        partialsDir: path.join(app.get('views'),'layouts'), //Decimos que las carpetas partials y layout estan en views
        extname: '.hbs', //defino como voy a terminar los archivos
        helpers: require('./helpers')
    }));//el motor que vamos a usar de hadlebars
    app.set('view engine','.hbs'); //Definimos el motor de plantillas

    //Middlewares
    app.use(morgan('dev'));
    app.use(multer({dest:path.join(__dirname,'../public/upload/temp')}).single('image')) //cuando se suba una imagen la mete en upload temp. pero solo recibiré una imagen image. Podríamos poner cualquier nombre. Lo que hay en single sera el input del formulario
    app.use(express.urlencoded({extended: false})); //recibo las imagenes
    app.use(express.json()); //manejaré los likes

    //Routes
    routes(app); //A routes que es lo que hemos modificado arriba le paso app.

    //Static files
    app.use('/public',express.static(path.join(__dirname,'../public'))); //el nombre que ponemos al principio es para que usemos la ruta public y podamos acceder a ella

    //errorhandlers
    if ('development' == app.get('env')){//me devuelve el entorno en el que estamos
        app.use(errorHandler);
    }

    return app; //devuelvo el objeto que lo llamaré en index.

    //HEMOS INSTALADO NODEMON npm -i nodemon -D //Así se reinicia cada vez que guardamos
}