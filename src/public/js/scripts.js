$('#btn-like').click(function(e){ //cuando haga click en el boton con el id btn-like
    e.preventDefault(); //Cancela el comportamiento normal de al hacer click redirigir porque vamos a hacer la nuestra propia
    let imgId = $(this).data('id');//lo pusimos en las propiedades del boton
    
    $.post('/images/'+imgId+'/like') //lo redirigimos a esta ruta que existe en nuestro servidor, mirar en rutas
        .done(data=>{
            console.log(data);//La respuesta quiero mostrarla por consola
            $('.likes-count').text(data.likes); //Selecciona el objeto likes count y cambia su texto poniendo lo que tengamos en data
        });
});

$('#btn-delete').click(function(e){ 
    e.preventDefault(); 
    let $this = $(this); //guardamos el elemento
    
    const response = confirm('Are you sure you want to delete this image?');

    if(response){
        let imgId = $this.data('id');
        $.ajax({//petición ajax
            url: '/images/'+imgId,
            type: 'DELETE'
        })
        .done(function (result){ //Cuando termine quiero transformar la respuesta en una funcion que capte el resultado y lo muestre
            console.log(result);
            $this.removeClass('btn-danger').addClass('btn-success');//elimina la clase btn danger y le pones la clase btn-success
            $this.find('i').removeClass('fa-times').addClass('fa-check');
            $this.append('<span>Deleted!</span>'); //Le agregamos el texto al botón
        });
    }
});