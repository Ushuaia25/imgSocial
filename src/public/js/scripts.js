$('#btn-like').click(function(e){ //cuando haga click en el boton con el id btn-like
    e.preventDefault(); //Cancela el comportamiento normal de al hacer click redirigir porque vamos a hacer la nuestra propia
    let imgId = $(this).data('id');//lo pusimos en las propiedades del boton
    
    $.post('/images/'+imgId+'/like') //lo redirigimos a esta ruta que existe en nuestro servidor, mirar en rutas
        .done(data=>{
            console.log(data);//La respuesta quiero mostrarla por consola
            $('.likes-count').text(data.likes); //Selecciona el objeto likes count y cambia su texto poniendo lo que tengamos en data
        });
});