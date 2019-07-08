
/*Login*/
var jsLogin = (function (jsLogin, undefined) {
        
    jsLogin.ready = function (){
        jsLogin.acciones();
    },

    jsLogin.acciones = function (){
        $('#btnIngresar').off('click');
        $('#btnIngresar').on('click', function () {
            var dni = $('#dni').val();
            var clave = $('#clave').val();

            if(dni != '' && clave != ''){
                var aRespuesta = null, oData = {};
                oData.dni = $('#dni').val();
                oData.clave = $('#clave').val();
                
                var oOptions = {
                    cUrl: "index.php?controlador=administrador&accion=ingresar",
                    oData: oData,
                    bAsync: false,
                    //contentType: 'application/x-www-form-urlencoded',
                    fComplete: function (oResponse, data) {
                        aRespuesta = (data);
                    }
                };
                $.GetUrlData(oOptions);

                if (!$.isEmpty(JSON.parse(aRespuesta))) {
                    window.location = '/Qatar2020Rest/index.php';
                } else {
                    $('#respuesta').html('<code>Usuario y contraseña incorrecta!</code>');
                }
            }else{
                    $('#respuesta').html('<code>Ingrese dni y clave!</code>');
            }
        });
    }

    return jsLogin;

})(jsLogin || {});