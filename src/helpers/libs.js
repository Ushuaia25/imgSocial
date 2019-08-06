const helpers = {};

helpers.randomNumber = () => {
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'//Todos los caracteres que queremos utilizar para el nombre aleatorio
    let randomNumber = 0;
    for (let i = 0; i < 6; i++){
        randomNumber += possible.charAt(Math.floor(Math.random() * possible.length)); //Nos dá un numero aleatorio que esté dentro de la longitud del string y lo pasa a entero con Math.floor que redondea hacia abajo y de ahí cogemos un caracter
    }
    return randomNumber;
};

module.exports = helpers;