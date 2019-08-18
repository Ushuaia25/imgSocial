const Stats = require('./stats'); //Lo pongo en mayus porque importo un modelo de datos
const Images = require('images');
const Comments = require('comments');

module.exports = async function (viewModel) { //A esta funcion le pasamos un modelo de datos y le agregamos mas datos. En controllers/image.js podemos verlo

    const results = await Promise.all([
        Stats(),
        Images.popular(),
        Comments.newest()
    ]);

    viewModel.sidebar = {
        stats: results[0],
        popular: results[1],
        comments: results[2]
    }

    return viewModel;
};