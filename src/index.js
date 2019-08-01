const express = require('express');

const config = require('./server/config');

const app = config(express()); //Al ejecutar express me devuelve un objeto que le paso a esa función. Aquí he llamado el objeto

//database
require('./database');

//starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});