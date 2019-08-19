const {Image} = require('../models');

module.exports = {

    async popular(){ //Una funcion que devolverá las más populares
        const images = await Image.find()
            .limit(9)//Las 9 imágenes más populares de mi site
            .sort({likes:-1});//ordenadas de las más populares a las menos
        return images;
    }

}