var jsPrincipal = (function (jsPrincipal, undefined) {
        
    jsPrincipal.ready = function (){
        jsPrincipal.acciones();
        jsPrincipal.click();

    },

    jsPrincipal.acciones = function (){
		jsPrincipal.cargarPagina('principal');
    },

    jsPrincipal.click = function (){
		
        $('.menu_opcion').off('click');
        $('.menu_opcion').on('click', function () {
        	var a = $(this).data('caso');
			jsPrincipal.cargarPagina(a);
        });
        $('.cerrarSesion').off('click');
        $('.cerrarSesion').on('click', function () {
        	var aRespuesta = null, oData = {};
                
                var oOptions = {
                    cUrl: "index.php?controlador=administrador&accion=CerrarSesion",
                    oData: oData,
                    bAsync: false,
                    //contentType: 'application/x-www-form-urlencoded',
                    fComplete: function (oResponse, data) {
                        aRespuesta = (data);
                        window.location = '/Qatar2020Rest/index.php';
                    }
                };
                $.GetUrlData(oOptions);
        });
    },

    jsPrincipal.cargarPagina = function (c){
        c = !$.isEmpty(c) ? c : 'notfound';
        var r = '';

        switch(c){
            case 'equipos':
                r = 'administrar/admin/equipos.php';
            break;
            case 'grupos':
                r = 'administrar/admin/grupos.php';
            break;
            case 'fixture':
                r = 'administrar/admin/fixture.php';
            break;
            case 'notfound':
            case 'principal':
            case '':
            default:
                r = 'administrar/admin/principal.php';
            break;
        };

        var aRespuesta = null, oData = {};

        var oOptions = {
            cUrl: r,
            oData: oData,
            bAsync: false,
            fComplete: function (oResponse, data) {
                aRespuesta = (data);
            }
        };
        $.GetUrlData(oOptions);

        $('.contenido_principal').html(aRespuesta);
    }
    

    return jsPrincipal;

})(jsPrincipal || {});

var jsEquipos = (function (jsEquipos, undefined) {
        
    jsEquipos.ready = function (){
        jsEquipos.acciones();
        jsEquipos.click();

    },
    jsEquipos.acciones = function (){
		jsEquipos.cargarEquipos();
        $('#tbl_equipos').dataTable({
        	"bPaginate": false,
        	"oLanguage": {
			    "sSearch": "Buscar: "
			  }
        });
    },

    jsEquipos.cargarEquipos = function (){
		$('.tbody_equipos').html('');
		var d = jsEquipos.cargarDatosEquipos();

		console.log(d);
    },


    jsEquipos.click = function (){
		
        $('.a').off('click');
        $('.a').on('click', function () {
        	
        });
    },

    jsEquipos.cargarDatosEquipos = function (){
		var aRespuesta = null, oData = {};

        var oOptions = {
            cUrl: 'index.php?controlador=equipos&accion=cargarEquipos',
            oData: oData,
            bAsync: false,
            fComplete: function (oResponse, data) {
                aRespuesta = (data);
            }
        };
        $.GetUrlData(oOptions);
		
		return aRespuesta;
    }


    return jsEquipos;

})(jsEquipos || {});
