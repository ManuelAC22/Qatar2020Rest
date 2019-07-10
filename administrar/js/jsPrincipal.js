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
    	var html = '<table id="tbl_equipos" class="table table-striped table-bordered">\
                    <thead>\
                      <tr>\
                        <th></th>\
                        <th>Código</th>\
                        <th>País</th>\
                        <th>Clasificado</th>\
                      </tr>\
                    </thead>\
                    <tbody class="tbody_equipos"></tbody>\
                   </table>'
		$('.div_tbl_equipos').html(html);
		var a = jsEquipos.cargarDatosEquipos();
		var d = JSON.parse(a);

		var table = '';

		for(var a in d){
			var i = d[a];
			table += '<tr>';

			table += '<td><img src="'+i.image+'" style="max-height: 30px;"/></td>';
			table += '<td>'+i.cod+'</td>';
			table += '<td>'+i.pais+'</td>';
			table += '<td><div class="checkbox">\
                          <label>\
                            <input type="checkbox" class="check_pais" value="'+i.cod+'" '+(i.clasificado == 1? 'checked' : '')+'>\
                          </label>\
                        </div></td>';

			table += '</tr>';

		}
		$('.tbody_equipos').html(table);
    },


    jsEquipos.click = function (){
		
        $('.check_pais').off('change');
        $('.check_pais').on('change', function () {
        	var pais = $(this).val();
        	var c = ($(this).prop('checked')) ? 1 : 0

			var a = JSON.parse(jsEquipos.guardarSeleccionado(pais,c));

			var resp = a[0].resultado;

			if(resp == 1){
			new PNotify({
                                title: 'Seleccionado',
                                text: 'Equipo guardado como clasificado',
                                type: 'success'
                            });
			}else if(resp == 2){
				new PNotify({
                                title: 'Seleccionado',
                                text: 'Solo pueden clasificar 32 países',
                                type: 'warning'
                            });
				jsEquipos.ready();
			}else{

				new PNotify({
                                title: 'Error',
                                text: 'Error en el proceso intentelo nuevamente',
                                type: 'danger'
                            });
				jsEquipos.ready();
			}
        });
    },

    jsEquipos.guardarSeleccionado = function (pais, c){
		var aRespuesta = null, oData = {};

		oData.pais = pais;
		oData.select = c;

        var oOptions = {
            cUrl: 'index.php?controlador=equipos&accion=guardarSeleccionado',
            oData: oData,
            bAsync: false,
            fComplete: function (oResponse, data) {
                aRespuesta = (data);
            }
        };
        $.GetUrlData(oOptions);
		
		return aRespuesta;
    }

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

var jsGrupos = (function (jsGrupos, undefined) {
        
    jsGrupos.ready = function (){
        jsGrupos.acciones();
        jsGrupos.click();

    },
    jsGrupos.acciones = function (){
		jsGrupos.cargarEquipos();
        $('#tbl_equipos').dataTable({
        	"bPaginate": false,
        	"oLanguage": {
			    "sSearch": "Buscar: "
			  }
        });
    },

    jsGrupos.cargarEquipos = function (){
    	var html = '<table id="tbl_equipos" class="table table-striped table-bordered">\
                    <thead>\
                      <tr>\
                        <th>Grupo</th>\
                        <th>País</th>\
                        <th>Cabeza de grupo</th>\
                      </tr>\
                    </thead>\
                    <tbody class="tbody_equipos"></tbody>\
                   </table>'
		$('.div_tbl_equipos').html(html);
		var a = jsGrupos.cargarDatosEquipos();
		var d = JSON.parse(a);

		var table = '';

		for(var a in d){
			var i = d[a];
			table += '<tr>';

			table += '<td>'+i.nombre_grupo+'</td>';
			table += '<td><img src="'+i.image+'" style="max-height: 30px;"/>'+i.pais+'</td>';
			table += '<td><div class="checkbox">\
                          <label>\
                            <input type="checkbox" class="check_pais" value="'+i.cod+'" '+(i.cabeza == 1? 'checked' : '')+'>\
                          </label>\
                        </div></td>';

			table += '</tr>';

		}
		$('.tbody_equipos').html(table);
    },


    jsGrupos.click = function (){
		
        $('.check_pais').off('change');
        $('.check_pais').on('change', function () {
        	var pais = $(this).val();
        	var c = ($(this).prop('checked')) ? 1 : 0

			var a = JSON.parse(jsGrupos.guardarSeleccionado(pais,c));

			var resp = a[0].resultado;

				jsGrupos.ready();
			if(resp == 1){
			new PNotify({
                                title: 'Seleccionado',
                                text: 'Equipo guardado como cabeza de grupo',
                                type: 'success'
                            });
			}else if(resp == 2){
				new PNotify({
                                title: 'Seleccionado',
                                text: 'Solo pueden haber 8 cabezas de grupo',
                                type: 'warning'
                            });
			}else if(resp == 3){
				new PNotify({
                                title: '',
                                text: 'No se puede editar, los grupos ya fueron generados',
                                type: 'warning'
                            });
			}else{

				new PNotify({
                                title: 'Error',
                                text: 'Error en el proceso intentelo nuevamente',
                                type: 'danger'
                            });
			}
        });    
        
        $('.generarGrupos').off('click');
        $('.generarGrupos').on('click', function () {
			var a = JSON.parse(jsGrupos.generarGrupos($('#claveGenerar').val()));
			jsGrupos.respuestaGenerar(a);
        });    
    },

    jsGrupos.respuestaGenerar = function (a){

			var resp = a[0].resultado;

			if(resp == 1){
			new PNotify({
                                title: 'Seleccionado',
                                text: 'Grupos y programacion generada correctamente',
                                type: 'success'
                            });
			}else if(resp == 2){
				new PNotify({
                                title: 'Seleccionado',
                                text: 'Aun no se han seleccionado todas las cabezas de grupo',
                                type: 'warning'
                            });
			}else if(resp == 3){
				new PNotify({
                                title: '',
                                text: 'Ya se ha superado el maximo de generaciones',
                                type: 'warning'
                            });
			}else if(resp == 4){
				new PNotify({
                                title: '',
                                text: 'Debe ingresar la clave correcta',
                                type: 'warning'
                            });
				$('.clave').show();
			}else{

				new PNotify({
                                title: 'Error',
                                text: 'Error en el proceso intentelo nuevamente',
                                type: 'danger'
                            });
			}
				jsGrupos.ready();
    }


    jsGrupos.guardarSeleccionado = function (pais, c){
		var aRespuesta = null, oData = {};

		oData.pais = pais;
		oData.select = c;

        var oOptions = {
            cUrl: 'index.php?controlador=equipos&accion=guardarCabezaGrupo',
            oData: oData,
            bAsync: false,
            fComplete: function (oResponse, data) {
                aRespuesta = (data);
            }
        };
        $.GetUrlData(oOptions);
		
		return aRespuesta;
    },

    jsGrupos.generarGrupos = function (clave){
		var aRespuesta = null, oData = {};

		oData.clave = clave;

        var oOptions = {
            cUrl: 'index.php?controlador=equipos&accion=generarGrupos',
            oData: oData,
            bAsync: false,
            fComplete: function (oResponse, data) {
                aRespuesta = (data);
            }
        };
        $.GetUrlData(oOptions);
		
		return aRespuesta;
    },

    jsGrupos.cargarDatosEquipos = function (){
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


    return jsGrupos;

})(jsGrupos || {});


var jsProg = (function (jsProg, undefined) {
        
    jsProg.ready = function (){
        jsProg.acciones();
        jsProg.click();

    },
    jsProg.acciones = function (){
		jsProg.cargarEquipos();
        $('#tbl_equipos').dataTable({
        	"oLanguage": {
			    "sSearch": "Buscar: "
			  }
        });
    },

    jsProg.cargarEquipos = function (){
    	var html = '<table id="tbl_equipos" class="table table-striped table-bordered">\
                    <thead>\
                      <tr>\
                        <th>Código</th>\
                        <th>País 1</th>\
                        <th>País 2</th>\
                        <th>Fecha</th>\
                      </tr>\
                    </thead>\
                    <tbody class="tbody_equipos"></tbody>\
                   </table>'
		$('.div_tbl_equipos').html(html);
		var a = jsProg.cargarDatosEquipos();
		var d = JSON.parse(a);

		var table = '';

		for(var a in d){
			var i = d[a];
			table += '<tr>';

			table += '<td>'+i.cod_partido+'</td>';
			table += '<td>'+i.pais1+'</td>';
			table += '<td>'+i.pais2+'</td>';
			table += '<td>'+i.fecha+'</td>';

			table += '</tr>';

		}
		$('.tbody_equipos').html(table);
    },

    jsProg.cargarDatosEquipos = function (){
		var aRespuesta = null, oData = {};

        var oOptions = {
            cUrl: 'index.php?controlador=equipos&accion=cargarProgramacion',
            oData: oData,
            bAsync: false,
            fComplete: function (oResponse, data) {
                aRespuesta = (data);
            }
        };
        $.GetUrlData(oOptions);
		
		return aRespuesta;
    }


    return jsProg;

})(jsProg || {});
