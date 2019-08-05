const ctrl = {}; //esto es un objeto. Un controlador es un objeto con funciones para exportar

ctrl.index = (req,res) => {
    res.send('Index page');
};

module.exports = ctrl; 