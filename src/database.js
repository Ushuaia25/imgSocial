const mongoose = require ('mongoose');

const {database} = require('./keys'); //con esto de poner entre llaves, accedemos solo a esa parte del objeto

mongoose.connect(database.URL,{
    useNewUrlParser:true //en esta versión obliga poner esta tercera propiedad
})
    .then(db => console.log('DB is connected')) //el .then es una promesa, si va bien la funcion haz eso
    .catch(err => console.error(err)); //en otro caso muestra el error