const { Comment, Image } = require('../models');

async function imagesCounter() {
    return await Image.countDocuments();//Nos devolverá el total de las imágenes
}

async function commentsCounter() {
    return await Comment.countDocuments();
}

async function imageTotalViewsCounter() {
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            viewsTotal: { $sum: '$views' } //Esto mete la suma de las vistas en la variable viewsTotal
        }
    }]);//Toma un vector como parámetro y este vector un objeto

    return result[0].viewsTotal; //Devolvemos un vector. Pero nosotros solo nos interesa el objeto de la posición 0 viewsTotal. Devolvemos esto para que lo veamos [{_id:'1',viewsTotal:'30'}]
}

async function likesTotalCounter() {
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            likesTotal: { $sum: '$likes' }
        }
    }]);//Toma un vector como parámetro y este vector un objeto

    return result[0].likesTotal;
}

module.exports = async () => {

    const results = await Promise.all([//Lo que puede hacer es ejecutar una enorme cantidad de funciones al mismo tiempo en paralelo. Ejecuta un arreglo de funciones
        imagesCounter(),
        commentsCounter(),
        imageTotalViewsCounter(),
        likesTotalCounter()
    ]); //Devolverá algo tal que así [10,50,100,500]

    return {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
    }
}