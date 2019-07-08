var JMGSLog = true;

(function ($) {
    /*
     //Mostrar en la consola del explorador los resultados de las operaciones según la configuración (Si la variable global JMGSLog está en true muestra en la consola caso contrario limpia la consola )
     $.Log({});
     */
    $.Log = function (obj) {
        //Construir
        if (JMGSLog) {
            console.log(obj);
        } else {
            //console.clear();
        }
        return;
    },
            $.encodeBase64 = function (value) {
                return btoa(value);
            },
            $.decodeBase64 = function (value) {
                return atov(value);
            },
            //Verifica si un elemento (object, array,string,Numero invalido) 
            $.isEmpty = function (value) {
                var bool = false;
                if ($.type(value) === 'undefined')
                    bool = true;
                if ($.type(value) === 'null')
                    bool = true;
                if ($.type(value) === '')
                    bool = true;
                if ($.type(value) === 'string' && value.length <= 0)
                    bool = true;
                if ($.type(value) === 'array' && value.length === 0)
                    bool = true;
                if ($.type(value) === 'object' && $.isHavePropertiesObject(value) === 0)
                    bool = true;
                if ($.type(value) === 'number' && isNaN(parseInt(value)))
                    bool = true;
                return bool;
            },
            $.animateCss = function (elementId, classAnimation) {
                $('#' + elementId).addClass(classAnimation + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(this).removeClass(classAnimation);
                    $(this).removeClass('animated');
                });
            },
            $.obtenerDataCbo = function (cboId, itemId, itemDes, data, placeholder) {
                var objDatos = {};
                document.getElementById(cboId).innerHTML = "";
                if ($.isEmpty(placeholder)) {
                    placeholder = "Seleccione una opción";
                }
                $.asignarValorSelect2(cboId, null, placeholder);

                if (!$.isEmpty(data)) {
                    $.each(data, function (index, item) {

                        $('#' + cboId).append(new Option(item[itemDes], item[itemId]));

                        objDatos[
                                item[itemId]
                        ] = item;
                    });
                }

                return objDatos;
            },
            $.asignarValorSelect2 = function (id, valor, placeholder) {
                if ($.isEmpty(placeholder)) {
                    placeholder = "Seleccione una opción";
                }
                $("#" + id).val(valor).trigger('change');
                if ($.isEmpty(valor)) {
                    if ($('#opc-' + id).length == 0) {
                        $('#' + id).append('<option id="opc-' + id + '"></option>').select2({placeholder: placeholder, width: '100%'});
                    }
                }
            },
            //Verifica que un objeto tenga propiedades
            $.isHavePropertiesObject = function (obj) {
                var count = 0;
                $.each(obj, function (index, item) {
                    count++;
                })
                return count;
            },
            /* Insertar transacciones */
            $.InsertarTransaccion = function (nOpeCodigo, ObjJson) {

                var ToXML = {
                    Transaccion: ObjJson
                }
                var xml = '';
                $.each(ToXML, function (index, value) {
                    xml += $.subXML(value, 'Transaccion');
                })
                $.Log('agregar proceso para insertar traccion')
//                $.ajax({
//                    type: "POST",
//                    url: "/GlobalAplication/Ga_Transacciones.aspx/InsertaTransacion",
//                    data: JSON.stringify({ nOpeCodigo: nOpeCodigo, Xml: xml }),
//                    contentType: "application/json; charset=utf-8",
//                    dataType: "json",
//                    async: false,
//                    success: function (response) {
//                        //Cargando(0);
//                    },
//                    error: function () {
//                        //Cargando(0);
//                    }
//                })

            },
            $.subXML = function (data2, etiqueta) {
                var xml = '';
                xml += '<' + etiqueta + '>';
                $.each(data2, function (index, value) {
                    xml += ((typeof value === 'object') ? $.subXML(value, index) : (Array.isArray(value) && value.length > 0 ? $.XML(value, index) : ('<' + index + '>' + value + '</' + index + '>')));
                })
                xml += '</' + etiqueta + '>';
                return xml;
            },
            $.XML = function (data1, etiqueta) {
                var xml = '';
                xml += '<' + etiqueta + '>';
                $.each(data1, function (index, value) {
                    xml += $.subXML(value, etiqueta);
                })
                xml += '</' + etiqueta + '>';
                return xml;
            },
            //Obtiene los datos de un Web Service o pagina
            $.Cargando = function (oOptions) {
                var tDivLoading;
                //Configuración por defecto
                oDefaultOpc = {
                    text: "Espere un momento...",
                    visible: true,
                    container: null
                };
                //Reemplaza los valores del objecto "options" en configuración por defecto 
                oOptions = $.extend({}, oDefaultOpc, oOptions);

                //Eliminar mensaje de carga
                if (oOptions.container === null) {
                    $(".mensajecarga").remove();
                }
                //Crear controles

                tDivLoading = $("<div>");
                tDivLoading.addClass(((oOptions.container === null) ? "mensajecarga width-100 height-100 col-sm-12" : "cnt_" + oOptions.container.replace("#", '') + " width-100 height-100"));
                tDivLoading.hide();
                var tDiv = $("<div>");
                tDiv.addClass(((oOptions.container === null) ? "mensajecarga-content" : "width-100 height-100 col-sm-12"));
                var tCenter = $("<center>");
                tCenter.addClass("no-margin");
                //var  tP = $("<p>");
                //tP.addClass("no-margin");
                var tSpan = $("<span>");
                //tSpan.addClass("fas fa-spinner fa-pulse fa-5x mensajecarga-content-text mensajecarga-content-text text-c-orange");
                tSpan.addClass((oOptions.container === null) ? 'fas fa-spinner fa-pulse fa-5x mensajecarga-content-text mensajecarga-content-text text-c-orange' : 'fas fa-spinner fa-pulse fa-2x mensajecarga-content-text mensajecarga-content-text text-c-orange');

                if (oOptions.container === null) {
                    var tH2 = $("<h2>");
                    tH2.attr("class", "mensajecarga-content-text text-normal")
                    var tI = $("<i>");
                    tI.html(oOptions.text)
                }
                //Crear diseño
                //tP.append(tSpan);
                tCenter.append(tSpan)
                if (oOptions.container === null) {
                    tCenter.append(tH2)
                    tH2.append(tI)
                }

                tDiv.append(tCenter);
                tDivLoading.append(tDiv);
                //Agregar al html       
                if (oOptions.container === null) {
                    $("body").append(tDivLoading);
                } else {
                    $(".cnt_" + oOptions.container.replace("#", '')).remove();
                    $(oOptions.container).html("");
                    $(oOptions.container).append(tDivLoading);
                }
                if (oOptions.visible) {
                    tDivLoading.show();
                }
                return tDivLoading;
            },
            //Obtiene los datos de un Web Service o pagina
            $.GetUrlData = function (oOptions) {
                //Configuración por defecto
                oDefaultOpc = {
                    cUrl: "controlador/usuario.controlador.php/index",
                    oData: {}, //Tipo de bùsqueda
                    contentType: "application/x-www-form-urlencoded", //application/json; charset=utf-8",
                    cDataType: "json",
                    cType: "post",
                    bAsync: false,
                    bProcessData: true,
                    fSuccess: function () {
                    },
                    fComplete: function () {
                    }
                };
                //Reemplaza los valores del objecto "options" en configuración por defecto 
                oOptions = $.extend({}, oDefaultOpc, oOptions);
                //Realiza la petición al servidor
                $.ajax({
                    beforeSend: function () {
                        //$.Log("beforeSend");
                    },
                    type: oOptions.cType,
                    url: oOptions.cUrl,
                    data: (oOptions.contentType === "application/x-www-form-urlencoded" || oOptions.contentType === "text/html; charset=utf-8" || oOptions.contentType === false) ? oOptions.oData : JSON.stringify(oOptions.oData),
                    contentType: oOptions.contentType,
                    dataType: oOptions.cDataType,
                    async: oOptions.bAsync,
                    processData: oOptions.bProcessData,
                    method: "POST",
                    success: function (response) {
                        oOptions.fSuccess(response);
                    },
                    complete: function (response) {
                        var responseText = response.responseText;
                        try {
                            var oData = JSON.parse(responseText).d;
                            if ($.type(oData) === 'object' || $.type(oData) === 'array') {
                                oOptions.fComplete(response, oData);
                            } else {
                                oOptions.fComplete(response, JSON.parse(oData));
                            }
                            //must be valid JSON
                        } catch (e) {
                            oOptions.fComplete(responseText, responseText);
                        }

                    },
                    statusCode: {
                        404: function () {
                            $.Log("statusCode 404 : Página no encontrada");
                        }
                    }
                });
                return;
            },
            $.toast = function (title, message, accion) {
                var timeOut = 4000;

                if (accion == 'info') {
                    timeOut = 7000;
                }

                setTimeout(function () {
                    toastr.options = {
                        closeButton: true,
                        progressBar: true,
                        showMethod: 'slideDown',
                        timeOut: timeOut
                    };

                    switch (accion) {
                        case 'exito':
                            toastr.success(message, title);
                            break;
                        case 'alerta':
                            toastr.warning(message, title);
                            break;
                        case 'error':
                            toastr.error(message, title);
                            break;
                        case 'info':
                            toastr.info(message, title);
                            break;
                    }


                }, 100);
            },
            $.vaidarTamanioDimensionPixelImage = function (contenidoId, ancho, alto) {
                var img = new Image();
                img.src = $('#' + contenidoId).attr('src');
                $.Log('Verificar la validacion porque no es la correcta');
                $.Log(img.width);
                $.Log(img.height);
                if (img.width === ancho && img.height === alto) {
                    return true;
                } else {
                    return false;
                }
            },
            $.loadButton = function (btnID, typeElement, text, second) {

                if (second === 0) {
                    $('#' + btnID).attr('disabled', false);

                    switch (typeElement) {
                        case 'button':
                            $('#' + btnID).html(text);
                            break;
                        case 'input':
                            $('#' + btnID).val(text);
                            break;
                    }
                } else {
                    $('#' + btnID).attr('disabled', true);
                    second = second < 0 ? 5 : second;

                    switch (typeElement) {
                        case 'button':
                            $('#' + btnID).html(text + ' (' + second + ')');
                            break;
                        case 'input':
                            $('#' + btnID).val(text + ' (' + second + ')');
                            break;
                    }
                    second--;

                    setTimeout("$.loadButton('" + btnID + "','" + typeElement + "','" + text + "'," + second + ")", 1000);
                }
            },
            $.verificarSesion = function () {
                var aRespuesta = true, oData = {};
                var oOptions = {
                    cUrl: "?controlador=usuario&accion=verificarSesion",
                    oData: oData,
                    bAsync: false,
                    fComplete: function (oResponse, data) {
                        oResponse = JSON.parse(oResponse);

                        if ($.isEmpty(oResponse)) {
                            aRespuesta = false;
                            location.href = "logout.php";
                        } else {
                            aRespuesta = true;
                        }
                    }
                };
                $.GetUrlData(oOptions);
                return aRespuesta;
                /*return true*/
            },
            /*
             * 
             * @param {string} inputID
             * @param {string} folder
             * @param {array} arrayDocType
             * @returns {string}
             */
            $.fileUploadLocal = function (inputID, folder, arrayDocType, validar, tamanioMaximoMb) {
                var files = $("#" + $.trim(inputID)).get(0).files;
                console.log(files);
                var obj = {};
                var mensaje = '';
                var nombreArchivo = '';
                var bandera = 0;
                var estado = 1;

                if(!$.isEmpty(files)) {

                    $.each(files, function(k, i){
                        
                        var data = new FormData();
                        data.append('file', i);
                        data.append('folder', $.trim(folder));
                        data.append('docType', arrayDocType);

                        if (!$.isEmpty(validar) && validar === true) {
                            var tamanioOriginal = (((i.size) / 1024) / 1024);

                            if (tamanioOriginal > tamanioMaximoMb) {
                                estado = 0;
                                mensaje += '(' + i.name + ') El tamaño del documento es mayor a ' + tamanioMaximoMb + ' MB<br/>';
                            }
                        }
                        
                        if (estado === 1) {
                            $.ajax({
                                url: "GlobalAplication/FileUpload.php",
                                method: "POST",
                                //data:new FormData(this),  
                                data: data,
                                contentType: false,
                                //cache:false,  
                                processData: false,
                                async: false,
                                success: function (data)
                                {
                                    var a = data.split('|');

                                    if (!$.isEmpty(a)) {
                                        estado = parseInt(a[0]);
                                        mensaje += a[1] === 'Registro exitoso' ? '' : a[1];
                                        nombreArchivo += estado === 1 ? a[2] + ',' : '';
                                        bandera = bandera + parseInt(a[0]);
                                    }
                                }
                            });
                        }
                    });

                } else {
                    estado = 0;
                    mensaje = 'No ha seleccionado el archivo.';
                }

                estado = bandera === files.length ? 1 : 0;

                if(bandera === files.length){
                    mensaje = 'Registro exitoso.'
                } else {
                    if(bandera !== 0){
                        estado = 1;
                        mensaje = 'Se han registrado ' + bandera + ' de ' + files.length + ' archivos sin embargo<br/>' + mensaje;
                    }
                }

                obj.estado = estado;
                obj.mensaje = mensaje;
                obj.nombreArchivo = nombreArchivo.substr(0, nombreArchivo.length - 1);

                return obj;
            },
            
            $.quitarTilde = function(s){
                var r=s.toLowerCase();
                    /*r = r.replace(new RegExp(/\s/g),"");*/ /* REEMPLAZAR ESPACIOS */
                    r = r.replace(new RegExp(/[àáâãäå]/g),"a");
                    r = r.replace(new RegExp(/[èéêë]/g),"e");
                    r = r.replace(new RegExp(/[ìíîï]/g),"i");
                    /*r = r.replace(new RegExp(/ñ/g),"n");*/
                    r = r.replace(new RegExp(/[òóôõö]/g),"o");
                    r = r.replace(new RegExp(/[ùúûü]/g),"u");

                return r;
            },
            
            $.separarMilesPorComas = function(numero, nroDecimales){
                numero = parseFloat(numero).toFixed(nroDecimales);
                numero = numero.replace(/\D/g, "").replace(/([0-9])([0-9]{2})$/, '$1.$2').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
                return numero;
            },

            $.fileRemoveLocal = function(ruta_fichero){
                var data = new FormData();
                var obj = {};
                var estado = '1';
                var mensaje = '';
                var alerta = '';

                data.append('ruta_fichero', ruta_fichero);

                if (estado === '1') {
                    $.ajax({
                        url: "GlobalAplication/FileRemove.php",
                        method: "POST",
                        //data:new FormData(this),  
                        data: data,
                        contentType: false,
                        //cache:false,  
                        processData: false,
                        async: false,
                        success: function (data)
                        {
                            var a = data.split('|');

                            if (!$.isEmpty(a)) {
                                estado = a[0];
                                mensaje = a[1];
                                alerta = a[2];

                            }
                        }
                    });
                }
                obj.estado = estado;
                obj.mensaje = mensaje;
                obj.alerta = alerta;

                return obj;
            };
})($);

$.validator.addMethod("letters", function (value, element) {
    return this.optional(element) || value == value.match(/^[a-zA-Z\s]*$/);
});

var jmgs = (function (jmgs, undefined) {

    jmgs.readyLogin = function () {
        history.pushState(null, "", "index.php");
        $('#nombre').val('');
        $('#apellidos').val('');
        $('#usuarioText').val('');
        $('#correo').val('');
        $('#password').val('');
        
        $('#usuario').val('');
        $('#contrasenia').val('');
        jmgs.validarFormulario();
        jmgs.onClick();
    },
            jmgs.onClick = function () {
                $('#btnIngresar').off('click');
                $('#btnIngresar').on('click', function () {
                    if ($('#formLogin').valid()) {
                        var aRespuesta = null, oData = {};
                        oData.usuario = $('#usuario').val();
                        oData.contrasenia = $('#contrasenia').val();
                        
                        var oOptions = {
                            cUrl: "index.php?controlador=usuario&accion=ingresar",
                            oData: oData,
                            bAsync: false,
                            //contentType: 'application/x-www-form-urlencoded',
                            fComplete: function (oResponse, data) {
                                aRespuesta = (data);
                            }
                        };
                        $.GetUrlData(oOptions);
                        if (!$.isEmpty(aRespuesta)) {
                            window.location = RUTA_PRINCIPAL;
                        } else {
                            $('#respuesta').html('<code>Usuario y contraseña incorrecta!</code>');
                        }
                    }
                });


                $('#btnRegistrar').off('click');
                $('#btnRegistrar').on('click', function () {
                    if ($('#frmRegistro').valid()) {
                        var aRespuesta = null, oData = {};
                        oData.nombre = $('#nombre').val();
                        oData.apellidos = $('#apellidos').val();
                        oData.usuario = $('#usuarioText').val();
                        oData.correo = $('#correo').val();
                        oData.contrasenia = $('#password').val();
                        
                        var oOptions = {
                            cUrl: "index.php?controlador=usuario&accion=registrarUSuarioPorLaWeb",
                            oData: oData,
                            bAsync: false,
                            //contentType: 'application/x-www-form-urlencoded',
                            fComplete: function (oResponse, data) {
                                aRespuesta = (data);
                            }
                        };
                        $.GetUrlData(oOptions);
                        aRespuesta = JSON.parse(aRespuesta);

                        if (!$.isEmpty(aRespuesta)) {
                            $('#respuestaRegistro').html(aRespuesta[0].vout_mensaje);

                            if(aRespuesta[0].vout_estado == 1){

                                $('#nombre').val('');
                                $('#apellidos').val('');
                                $('#usuarioText').val('');
                                $('#correo').val('');
                                $('#password').val('');
                                $('#respuestaRegistro').removeClass('msj-error').addClass('msj-exito');

                                setTimeout(function(){
                                    $('#tab_1_ingresar').click();
                                    $('#respuestaRegistro').html('');
                                }, 6000);
                            }
                        } else {
                            $('#respuestaRegistro').html('<code>Problemas al intentar registrarle!</code>');
                        }
                    }
                });

                $('.a_nuevaVentana').off('click');
                $('.a_nuevaVentana').on('click', function (e) {
                    e.preventDefault();
                    var tab = window.open(RUTA_PRINCIPAL, '_blank');
                    if (tab) {
                        tab.focus(); //ir a la pestaña
                    } else {
                        $.toast(ALERTA_TITULO, 'Pestañas bloqueadas, activa las ventanas emergentes (Popups)', 'alerta')

                        return false;
                    }
                });
            },
            jmgs.validarFormulario = function () {
                $('#formLogin').validate({
                    errorElement: 'label',
                    errorClass: 'error',
                    focusInvalid: true,
                    errorPlacement: function (error, element) {
                        if (element.parent('.vali').length) {
                            error.insertAfter(element.parent());
                        } else {
                            error.insertAfter(element);
                        }
                    },
                    rules: {
                        usuario: {required: true},
                        contrasenia: {required: true}
                    },

                    messages: {
                        usuario: {required: "Ingresar usuario."},
                        contrasenia: {required: "Ingresar contraseña."}
                    }
                });


                /*modificar formulario segun proyecto*/
                $('#frmRegistro').validate({
                    errorElement: 'label',
                    errorClass: 'error',
                    focusInvalid: true,
                    errorPlacement: function (error, element) {
                        if (element.parent('.vali').length) {
                            error.insertAfter(element.parent());
                        } else {
                            error.insertAfter(element);
                        }
                    },
                    rules: {
                        nombre: {required: true},
                        apellidos: {required: true},
                        usuarioText: {required: true},
                        correo: {required: true, email: true},
                        password: {required: true},
                        repeatPassword: {required: true}
                    },

                    messages: {
                        nombre: {required: "Ingresar nombres."},
                        apellidos: {required: "Ingresar apellidos."},
                        usuarioText: {required: "Ingresar usuario"},
                        correo: {required: "Ingresar correo", email: "Formato incorrecto."},
                        password: {required: "Ingresar contraseña"},
                        repeatPassword: {required: "Ingresar contraseña"}
                    }
                });
            },
            jmgs.readyIndex = function () {
                history.pushState(null, "", "index.php");
                jmgs.onClick();
                $.toast(ALERTA_TITULO, 'Le da la bienvenida', 'exito');

            },
            jmgs.obtenerSubMenu = function (codigo) {
                $.post('index.php?controlador=usuario&accion=obtenerSubMenu', {
                    codigo: codigo
                }, function (data) {
                    jmgs.limpiarContent();
                    jmgs.dibujarSubMenu(data);
                });
            },
            jmgs.dibujarSubMenu = function (data, caso) {
                var html = '', jer = '';
                var caso = !$.isEmpty(caso) ? caso : 'static';

                if (!$.isEmpty(data)) {
                    for (var i = 0; i < data.length; i++) {

                        switch(caso){
                            case 'static' :
                                if (data[i].puga != 0) {
                                    var onclic = data[i].Pagina !== '#' ? 'onclick="jmgs.limpiarContent();jmgs.cargarVista(\'' + data[i].Pagina + '\')"' : 'onclick="jmgs.limpiarContent();"';

                                    if (data[i].hijo == 1) {

                                        if (i != 0) {
                                            html += '</ul></li>';
                                        }
                                        html += '<li class="nav-item dropdown">'
                                                + '<a href="#" ' + onclic + ' class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">' + data[i].cIntNombre + ' </a>'
                                                + '<ul class="dropdown-menu" aria-labelledby="navbarDropdown">';
                                        jer = data[i].cIntJerarquia;
                                    } else if (data[i].hijo == 0) {

                                        if (jer == data[i].idpadre) {
                                            html += '<li><a href="#" ' + onclic + '>' + data[i].cIntNombre + '</a></li>';

                                            if (i == (data.length) - 1) {
                                                html += '</ul></li>';
                                            }
                                        } else {
                                            html += '</ul></li>';
                                            jer = data[i].cIntJerarquia;
                                            html += '<li><a href="#" ' + onclic + '>' + data[i].cIntNombre + '</a></li>';
                                        }
                                    }
                                }
                            break;
                            case 'robust' :
                                if (data[i].puga != 0) {
                                    var onclic = data[i].Pagina !== '#' ? 'onclick="jmgs.limpiarContent();jmgs.cargarVista(\'' + data[i].Pagina + '\')"' : 'onclick="jmgs.limpiarContent();"';

                                    if (data[i].hijo == 1) {

                                        if (i != 0) {
                                            html += '</ul></li>';
                                        }
                                        html += '<li class="nav-item dropdown">'
                                                + '<a href="#" ' + onclic + ' class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">' + data[i].cIntNombre + ' </a>'
                                                + '<ul class="dropdown-menu" aria-labelledby="navbarDropdown">';
                                        jer = data[i].cIntJerarquia;
                                    } else if (data[i].hijo == 0) {

                                        if (jer == data[i].idpadre) {
                                            html += '<li><a href="#" ' + onclic + '>' + data[i].cIntNombre + '</a></li>';

                                            if (i == (data.length) - 1) {
                                                html += '</ul></li>';
                                            }
                                        } else {
                                            html += '</ul></li>';
                                            jer = data[i].cIntJerarquia;
                                            html += '<li><a href="#" ' + onclic + '>' + data[i].cIntNombre + '</a></li>';
                                        }
                                    }
                                }
                            break;
                        }
                    }
                    $('#subMenu').html(html);
                } else {
                    $('#subMenu').html('');
                }
            },
            jmgs.limpiarContent = function () {
                $('#content').html('');
            },
            jmgs.cargarVista = function (pagina) {
                if (pagina !== '#') {
                    $.ajax({url: pagina, success: function (result) {
                            $("#content").html(result);
                        }});
                }
            },

            /*Modificar registro según requerimiento*/
            jmgs.registroPrimerRegistro = function(){

            }

    return jmgs;

})(jmgs || {});


/*GENERAL*/

var ArrDataTableGen = {};
function ShowDataTable(Config) {
    var data = new Object();
    $.ajax({
        type: "POST",
        url: Config["ajax.url"],
        data: Config["ajax.data"],
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        async: false,
        success: function (response) {
            /*------------------CONVERTIMOS EL DATATABLE(STRING) EN OBJECT-------------*/
            data = eval(response)

            /*------------------CREAMOS LOS CONTENEDORES DEL DATATABLE-------------*/
            var datatablecontainer = Config["datatable.container"]
            var datatableid = "tbl_" + datatablecontainer;

            $("#" + datatablecontainer).html("");
            if (data.length == 0 && Config["datatable.not_rows"] !== undefined) {

                var htmlmsji = '<div class="alert alert-warning"><button class="close" data-dismiss="alert" type="button"><i class="ace-icon fa fa-times"></i></button><strong>Importante!</strong> "No hemos encontrado coincidencias para tu búsqueda"<br></div>';
                $("#" + datatablecontainer).html(((Config["datatable.msjBusqueda"] !== "undefined") ? Config["datatable.MyMsjBusqueda"] : htmlmsji));
                return;
            }
            var html = '<div class="table-header">&nbsp;&nbsp;' + Config["datatable.titulo"] + '</div><div><table id="' + datatableid + '" class="table table-striped table-bordered table-hover display" cellspacing="0px"></table></div>'
            $("#" + datatablecontainer).append(html);
            var Options = Config["datatable.opciones"];



            /*------------------DAMOS EL FORMATO JSON QUE USA EL DATATABLE-------------*/
            var dataSet = new Array()
            var iii = 0;
            $.each(data, function (index, item) {

                if (Config["datatable.checkbox"] !== undefined) {

                    item["checkbox"] = "<label><input name='" + datatableid + "_chk_multiple' class='ace' type='checkbox'><span class='lbl'></span></label>";
                }

                var htmlOpt = "";

                if (Config["datatable.opciones"] !== undefined) {
                    /*------------------CREAMOS OPCIONES PARA RESOLUCIONES DE PANTALLA MEDIANA O LARGA-------------*/

                    if (Options.length > 0) {

                        htmlOpt = htmlOpt + '<div class="d-sm-none d-xs-none d-md-block d-lg-block action-buttons text-center">'
                        
                        $.each(Options[0], function (indexopt, itemopt) {
                            if (item[indexopt] === undefined) {
                                item[indexopt] = "0";
                            }

                            var mdlg = ((itemopt["md-lg"] === undefined) ? true : itemopt["md-lg"])
                            if (mdlg) {
                                htmlOpt = htmlOpt + '<a ' + ((item[indexopt] === "0") ? itemopt["extra-attr"] : "") + '    style="font-size: 12px;color:' + ((item[indexopt] === "0") ? itemopt["class-color"] : "grey icon-disabled") + '  "   data-toggle="tooltip" title="' + ((item[indexopt] === "0") ? itemopt["tooltip-title"] : itemopt["icon-disabled-title"]) + '" data-original-title="' + ((item[indexopt] === "0") ? itemopt["tooltip-title"] : itemopt["icon-disabled-title"]) + '" data-placement="bottom">'
                                htmlOpt = htmlOpt + '<i id="'+datatablecontainer+'_' +indexopt+'" class="gaby ' + ((item[indexopt] === "0") ? itemopt["fa-clase"] : itemopt["icon-disabled"]) + '"></i>&nbsp;'
                                htmlOpt = htmlOpt + '</a>&nbsp;'
                            }



                        });
                        htmlOpt = htmlOpt + '</div>'
                        
                        /*------------------CREAMOS OPCIONES PARA RESOLUCIONES DE PANTALLA SMALL O EXTRA SMALL-------------*/
                        htmlOpt = htmlOpt + '<div class="d-md-none d-lg-none">'
                        htmlOpt = htmlOpt + '<div class="inline pos-rel">'
                        htmlOpt = htmlOpt + '<button class="btn btn-minier btn-yellow dropdown-toggle" data-toggle="dropdown" data-position="auto">'
                        //htmlOpt = htmlOpt + '<i class="ace-icon fa fa-caret-down icon-only bigger-120"></i>'
                        htmlOpt = htmlOpt + '</button>'
                        htmlOpt = htmlOpt + '<ul class="dropdown-menu dropdown-only-icon dropdown-yellow dropdown-menu-right dropdown-caret dropdown-close">'
                        $.each(Options[0], function (indexopt, itemopt) {

                            if (item[indexopt] === undefined) {
                                item[indexopt] = "0";
                            }
                            
                            var smxs = ((itemopt["sm-xs"] === undefined) ? true : itemopt["sm-xs"])
                            if (smxs) {
                                
                                if(item[indexopt] === '0'){
                                    htmlOpt = htmlOpt + '<li class="' + ((item[indexopt] === "0") ? "" : "icon-disabled") + '">'
                                    htmlOpt = htmlOpt + '<a  class="tooltip-info" data-rel="tooltip" title="">'
                                    htmlOpt = htmlOpt + '<span style="color:' + ((item[indexopt] === "0") ? itemopt["class-color"] : "grey") + ',font-size: 11px;">'
                                    htmlOpt = htmlOpt + '<i id="'+datatablecontainer+'_' +indexopt+'" class="' + ((item[indexopt] === "0") ? itemopt["fa-clase"] : itemopt["icon-disabled"]) + ' "></i>&nbsp;' + ((item[indexopt] === "0") ? itemopt["tooltip-title"] : itemopt["icon-disabled-title"]) 
                                    htmlOpt = htmlOpt + '</span>'
                                    htmlOpt = htmlOpt + '</a>'
                                    htmlOpt = htmlOpt + '</li>'
                                }
                            }


                        })
                        htmlOpt = htmlOpt + '</ul>'
                        htmlOpt = htmlOpt + '</div>'
                        htmlOpt = htmlOpt + '</div>'
                    }
                }

                item["Opcion"] = htmlOpt;


                iii = iii + 1
                item["DT_RowId"] = ((item[Config["DT_RowId"]] !== undefined) ? (item[Config["DT_RowId"]]) : (iii))
                dataSet.push(item)
            })


            /*------------------CREAMOS EL DATATABLE-------------*/
            var confdtiit = {
                //CAMBIAR EL N° DE FILAS POR PAGINA. POR DEFECTO:   [[5, 10, 25, 50, -1], [5, 10, 25, 50, "Todo"]]
                "lengthMenu": ((Config["datatable.lengthMenu"] !== undefined) ? Config["datatable.lengthMenu"] : [[5, 10, 25, 50, -1], [5, 10, 25, 50, "Todo"]]),
                //N° DE FILAS POR PAGINA. POR DEFECTO 10
                "iDisplayLength": ((Config["datatable.iDisplayLength"] !== undefined) ? Config["datatable.iDisplayLength"] : "10"),
                //HABILITAR O NO PAGINACIÓN DEL DATATABLE (POR DEFECTO TRUE)
                "paging": ((Config["datatable.paging"] !== undefined) ? Config["datatable.paging"] : true),
                //"pagingType": "full_numbers"//AUN NO SE LE DA USO
                //HABILITAR O NO QUE SE ORDENEN LOS REGISTROS POR DEFECTO .  POR DEFECTO FALSE (QUIERE DECIR QUE SE MUESTRA TAL COMO VIENE DE LA BASE DE DATOS)
                "ordering": ((Config["datatable.ordering"] !== undefined) ? Config["datatable.ordering"] : false),
                //HABILITA EL DETALLE DE DATOS ENCONTRADOS Y EL NUMERO DE PAGINAS. POR DEFECTO TRUE
                "order": ((Config["datatable.order"] !== undefined) ? Config["datatable.order"] : []),
                "info": ((Config["datatable.info"] !== undefined) ? Config["datatable.info"] : true),
                dom: 'Bfrtip',
                buttons: 
                    //['copy', 'excel', 'pdf', 'print']
                    Config["datatable.buttons"]
                ,
                //TEXTO DE IDIOMA EN EL DATATABLE Y FORMATOS DE NUMEROS
                "language": {
                    //"decimal": ",",
                    //"thousands": ".",
                    //"lengthMenu": "Display _MENU_ records per page",
                    //"zeroRecords": "Nothing found - sorry",
                    //"info": "Showing page _PAGE_ of _PAGES_",
                    //"infoEmpty": "No records available",
                    //"infoFiltered": "(filtered from _MAX_ total records)"
                },
                //TEXTO DE IDIOMA EN EL DATATABLE Y FORMATOS DE NUMEROS
                "oLanguage": {
                    "sEmptyTable": "No hay registros disponibles",
                    "sInfo": "Hay _TOTAL_ registro(s). Mostrando de (_START_ a _END_)",
                    "sInfoEmpty": "Hay _TOTAL_ registro(s). Mostrando de (_START_ a _END_)",
                    "sLoadingRecords": "Por favor espera - Cargando...",
                    "sSearch": "",
                    "sLengthMenu": "Mostrar _MENU_",
                    "oPaginate": {
                        "sLast": "Última página",
                        "sFirst": "Primera",
                        "sNext": "Siguiente",
                        "sPrevious": "Anterior"
                    }
                },
                //CAMBIAR LA POSICION DE LOS CONTROLES DE BUSQUEDA PAGINACION ETC
                //"dom": '<"top"i>rt<"bottom"flp><"clear">',
                //PARA AGREGAR ESTILOS Y EVENTOS
                "fnDrawCallback": function (oSettings) {
                    DatatableEstilosYEventos();
                    if (Config["datatable.funcion.complete"] !== undefined) {
                        eval(Config["datatable.funcion.complete"] + "('" + datatableid + "')");
                    }
                },
                //HABILITAMOS LA RESPONSIVIDAD DE EL DATATABLE. POR DEFECTO TRUE
                "responsive": true,
                //AGREGAMOS LA DATA AL DATATABLE
                "data": dataSet,
                //xxxxx
                //"scrollY": 200,
                // "scrollX": true,


                //AGREGAMOS LA ESTRUCTURA DE LAS COLUMNAS DEL DATATABLE
                "columns":
                        Config["datatable.columns"],
                'rowsGroup': ((Config["datatable.rowsGroup"] !== undefined) ? Config["datatable.rowsGroup"] : false),
                //rowGroup:  ((Config["datatable.rowsGroup"] !== undefined) ? true :false)
            };

            if (Config["datatable.scrollY"] !== undefined) {
                confdtiit.scrollY = ((Config["datatable.scrollY"] !== undefined) ? Config["datatable.scrollY"] : "none");
                confdtiit.scrollCollapse = ((Config["datatable.scrollCollapse"] !== undefined) ? Config["datatable.scrollCollapse"] : false);

            }

            var dtConvocatoria = $('#' + datatableid).DataTable(confdtiit);

            ArrDataTableGen[datatablecontainer] = dtConvocatoria;


            //APLICAMOS EL EVENTO  CLICK A LAS FILAS
            $('#' + datatableid + ' tbody').on('click', 'tr', function () {
                if (Config["datatable.onClickRow"] !== undefined) {
                    var row = dtConvocatoria.row(this).data();
                    eval(Config["datatable.onClickRow"] + "(" + JSON.stringify(row) + ")");
                }
                $('#' + datatableid + ' tbody tr').removeClass("table-hover-static");
                $(this).addClass("table-hover-static");

            });

            $('#' + datatableid + ' tbody').on('dblclick', 'tr', function () {
                if (Config["datatable.onDoubleClickRow"] !== undefined) {
                    var row = dtConvocatoria.row(this).data();
                    eval(Config["datatable.onDoubleClickRow"] + "(" + JSON.stringify(row) + ")");
                }
                $('#' + datatableid + ' tbody tr').removeClass("table-hover-static");
                $(this).addClass("table-hover-static");

            });

            $('#' + datatableid + ' tbody tr').mousedown(function (event) {
                if (event.which === 3) {
                    if (Config["datatable.onClickRightRow"] !== undefined) {
                        var row = dtConvocatoria.row(this).data();
                        eval(Config["datatable.onClickRightRow"] + "(" + JSON.stringify(row) + ")");
                    }
                    $('#' + datatableid + ' tbody tr').removeClass("table-hover-static");
                    $(this).addClass("table-hover-static");
                }
            });


            function  EditarInRow(trpadre) {

                var id = trpadre.id;
                var row = dtConvocatoria.row(trpadre).data();
                var hijos = $(trpadre).children("td");
                var hijos2 = hijos
                var colindex = 0;
                var cambiaicons = false
                $.each(hijos, function (index, item) {
                    var ConfigEdit = Config["datatable.columns"][index]
                    if (ConfigEdit["edittype"] !== undefined) {
                        cambiaicons = true;
                        var valdefault = $(item).html();
                        if (ConfigEdit["edittype"] == "textarea" && ConfigEdit["data"] !== "Opcion") {
                            $(item).html("");
                            $(item).append("<textarea  class='" + ((ConfigEdit["editclass"] !== undefined) ? ConfigEdit["editclass"] : "") + "'    id='" + ConfigEdit["data"] + "_" + id + "'   name='" + ConfigEdit["data"] + "' style='width: 100%;' value='" + row[ConfigEdit["data"]] + "'>" + row[ConfigEdit["data"]] + "</textarea >");
                            $(item).css("padding-right", "11px")
                        } else if (ConfigEdit["edittype"] == "input" && ConfigEdit["data"] !== "Opcion") {
                            if (ConfigEdit["inputtype"] !== undefined)
                            {
                                if (ConfigEdit["inputtype"] == "hidden") {

                                } else {
                                    $(item).html("");
                                }

                            } else {
                                $(item).html("");
                            }


                            if (ConfigEdit["inputtype"] == "checkbox") {
                                var checked = ((row[ConfigEdit["data"]] == ConfigEdit["editOption"]["checked"]) ? "checked" : "unchecked");
                            }


                            $(item).append(((ConfigEdit["inputtype"] === "checked") ? '<label class="pos-rel">' : "") + "<input  " + checked + " class='form-control ac_input " + ((ConfigEdit["editclass"] !== undefined) ? ConfigEdit["editclass"] : "") + "' type='" + ((ConfigEdit["inputtype"] !== undefined) ? ConfigEdit["inputtype"] : "text") + "' " + ((ConfigEdit["editevents"] !== undefined) ? ConfigEdit["editevents"] : "") + "      id='" + ConfigEdit["data"] + "_" + id + "'   name='" + ConfigEdit["data"] + "' value='" + row[ConfigEdit["data"]] + "'/>" + ((ConfigEdit["inputtype"] === "checked") ? '<span class="lbl"></span></label>' : ""));

                            if (ConfigEdit["inputtype"] == "checkbox") {
                                $("#" + ConfigEdit["data"] + "_" + id).click(function () {

                                    if ($("#" + ConfigEdit["data"] + "_" + id).is(':checked')) {
                                        $("#" + ConfigEdit["data"] + "_" + id).val(ConfigEdit["editOption"]["checked"]);
                                    } else {
                                        $("#" + ConfigEdit["data"] + "_" + id).val(ConfigEdit["editOption"]["unchecked"]);
                                    }


                                })


                            }


                            $(item).css("padding-right", "11px")
                        } else if (ConfigEdit["edittype"] == "select" && ConfigEdit["data"] !== "Opcion") {
                            $(item).html("");
                            $(item).append("<select  id='" + ConfigEdit["data"] + "_" + id + "'   name='" + ConfigEdit["data"] + "' " + ((ConfigEdit["editAttr"] !== undefined) ? ConfigEdit["editAttr"] : "") + "  class='form-control ac_input " + ((ConfigEdit["editclass"] !== undefined) ? ConfigEdit["editclass"] : "") + "'></select>");
                            $(item).css("padding-right", "11px")
                            //Crear opciones
                            Utilitarios.createOptionArray("#" + ConfigEdit["data"] + "_" + id, ConfigEdit["editOption"]);
                            //$("#Tipo_91000240 option:contains('MENSUAL')").val();
                            if (ConfigEdit["editSelected"] !== undefined) {

                                $(item).find("select").selectpicker();

                                $(item).find("select").selectpicker('val', JSON.parse("[" + row[ConfigEdit["editSelected"]] + "]"));
                            } else {
                                $("#" + ConfigEdit["data"] + "_" + id + " option:contains(" + valdefault + ")").attr('selected', true);
                            }


                        }

                        $(".class-calendar").datepicker();

                        //Validar
                        if ($("#" + datatableid + " .class-chosen").length > 0) {
                            $(".class-chosen").selectpicker();
                        }

                    }
                    if (cambiaicons) {
                        if (ConfigEdit["data"] === "Opcion") {
                            $(item).html("");
                            $(item).append('<div class="action-buttons" ><a class="blue" title="" data-toggle="tooltip"  data-original-title="Guardar"><i class="ace-icon fa fa-save bigger-130"></i></a><a class="red" title="" data-toggle="tooltip"  data-original-title="Cancelar"><i class="ace-icon fa fa-ban bigger-130"></i></a>')
                            $(item).find("div").find("a").find(".fa-ban").click(function () {
                                $.each(hijos2, function (indexh2, itemh2) {
                                    $(itemh2).html("");
                                    var ConfigEditChi2 = Config["datatable.columns"][indexh2]
                                    $(itemh2).html(row[ConfigEditChi2["data"]])
                                    DatatableEstilosYEventos()
                                    inputstemporales();
                                })
                            })
                            $(item).find("div").find("a").find(".fa-save").click(function () {
                                var datatr = $('#' + datatableid + ' #' + id + ' textarea,' + '#' + datatableid + ' #' + id + ' select' + ',#' + datatableid + ' #' + id + " input");
                                var datajsonids = new Object()
                                $.each(datatr, function (indextr, itemtr) {
                                    datajsonids[itemtr["name"]] = itemtr["id"]
                                })
                                var datajsonidsstr = JSON.stringify(datajsonids)
                                if (Config["datatable.before.editrow"] !== undefined) {
                                    var validate = eval("" + Config["datatable.before.editrow"] + "(" + datajsonidsstr + ")")
                                } else {
                                    validate = true;
                                }
                                if (validate) {
                                    var ajaxdata = $('#' + datatableid + ' #' + id + ' textarea,' + '#' + datatableid + ' #' + id + ' select' + ',#' + datatableid + ' #' + id + " input" + ',#' + datatableid + ' #' + id + " input[type=checkbox]" + ',#' + datatableid + ' #' + id + " input[type='radio']").serializeArray({checkboxesAsBools: false});

                                    jQuery('#' + datatableid + ' #' + id + ' input[type=checkbox]:not(:checked)').map(
                                            function () {
                                                return ajaxdata.push({"name": this.name, "value": this.value})
                                            }).get()

                                    jQuery('#' + datatableid + ' #' + id + ' select option:selected').map(
                                            function () {
                                                return ajaxdata.push({"name": this.name, "value": $(this).map(function () {
                                                        return this.value
                                                    }).get().join(", ")})
                                            }).get()

                                    //$("#" + datatableid + " #" + id+" select option:selected").map(function(){ return this.value }).get().join(", ")

                                    var ObjDataAjax = new Object()
                                    ObjDataAjax[Config["DT_RowId"]] = id
                                    $.each(ajaxdata, function (ad222index, ad222item) {
                                        ObjDataAjax[ad222item["name"]] = ad222item["value"]
                                    })

                                    if (Config["ajax.opciones.extraparams"] !== undefined) {
                                        $.each(Config["ajax.opciones.extraparams"], function (epindex, epitem) {
                                            ObjDataAjax[epindex] = epitem
                                        })
                                    }

                                    $('#' + datatableid + ' #' + id + " select:[multiple]").each(function (index, item) {

                                        var name = $(item).attr("name");
                                        //var value = $(item).map(function(){ return item.value }).get().join(",");
                                        var value = $(item).val();

                                        ObjDataAjax[name] = value.toString();

                                    })

                                    Cargando();
                                    $.ajax({
                                        type: "POST",
                                        url: Config["datatable.save.editrow.url"],
                                        data: JSON.stringify(ObjDataAjax),
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        success: function (response) {
                                            Cargando(0);
                                            if (parseInt(response.d) >= 1) {
                                                Transacciones(Config["datatable.save.editrow.nOpeCodigo"], ObjDataAjax)
                                                var mensaje12 = "Se han guardado los datos correctamente."
                                                var tipmsj12 = "exito"
                                                var ObjMensaje = Config["datatable.success.editrow"];

                                                if (ObjMensaje !== undefined)
                                                {

                                                    if (ObjMensaje.length > 0) {


                                                        $.each(ObjMensaje[0], function (index, item) {
                                                            if (index.toString() == response.d.toString())
                                                            {
                                                                mensaje12 = item.mensaje
                                                                tipmsj12 = item.tipo
                                                            }
                                                        })
                                                    }

                                                }
                                                msgbox('Campus', mensaje12, tipmsj12)



                                                //msgbox("AUT&Oacute;NOMA VIRTUAL", "Se han guardado los datos correctamente.", "exito");



                                                eval("" + Config["datatable.after.editrow"] + "(" + JSON.stringify(ObjDataAjax) + ")")
                                            } else {
                                                msgbox("", "Error inesperado procesando su solicitud.", "error");
                                            }
                                        },
                                        error: function (result) {
                                            Cargando(0);
                                            msgbox("", "Error inesperado procesando su solicitud.", "error");
                                        }
                                    });
                                }
                            })
                        }
                    }
                    colindex = colindex + 1
                })
                DatatableEstilosYEventos()



            }

            //APLICAMOS EL EVENTO DOBLE CLICK A LAS FILAS
            $('#' + datatableid + ' tbody').on('dblclick', 'tr', function () {

                // EditarInRow(this)
            })


            function inputstemporales() {


                var trsss = $("#" + datatableid).find("tbody").find("tr");
                var columnsdtb = Config["datatable.columns"];

                $.each(trsss, function (trinx, tritm) {
                    var tdsss = $(tritm).find("td");
                    var rowsss = dtConvocatoria.row($(tritm)).data();
                    $.each(columnsdtb, function (index, item) {
                        if (item["inputtype"] == "checkbox") {
                            var tdunique = tdsss[index];

                            if (rowsss !== undefined) {
                                var valueee = rowsss[item.data]
                                var chkdisbled = '<label class="pos-rel">' + "<input  " + ((valueee == item["editOption"]["checked"]) ? "checked" : "") + "     value=" + valueee + "  type='checkbox' disabled='disabled' class='form-control ac_input ace'>" + '<span class="lbl"></span></label>';
                                $(tdunique).html("");
                                $(tdunique).append(chkdisbled)
                            }

                        }
                    })
                })
                //var row = dtConvocatoria.row(this).data();

            }

            inputstemporales()

            function DatatableEstilosYEventos() {



                $("#" + datatableid + " .ace-check-all").change(function () {
                    var checkcc = ($(this).is(":checked")) ? true : false;

                    $("#" + datatableid + ' th input[type=checkbox], #' + datatableid + ' td input[type=checkbox]').prop('checked', checkcc);

                    if (checkcc) {
                        $("#" + datatableid + ' input[type=checkbox]').parents("td").parents("tr").addClass("success")
                    } else {
                        $("#" + datatableid + ' input[type=checkbox]').parents("td").parents("tr").removeClass("success")
                    }
                })





                $(".table-header").css({"line-height": "30px"});
                $("#" + datatableid + "_filter").find("label").find(".form-control").attr('placeholder', 'Buscar...');
                $("#" + datatableid + "_filter").find("label").find(".form-control").attr('style', 'height:31px !important');
                $("#" + datatableid + "_length").find("label").find("select").attr("style", "height:31px !important; margin-bottom:3px !important");
                $("#" + datatableid + "_wrapper").find(".row").attr("style", "padding-bottom: 1px !important;padding-top: 5px !important;");
                //$("#" + datatableid + "_wrapper").addClass("table-responsive");

                $("#" + datatableid).find("thead").find("tr").find("th").attr("style", "margin:0px !important; padding:4px !important");
                $("#" + datatableid + "_paginate").find("ul").find("li").find("a").attr("style", "padding: 1px 7px;");
                $(".dataTables_info").attr("style", "font-size: 12px;")
                $("#" + datatableid).find("tbody").find("tr").find("td").attr("style", "margin:0px !important; padding:4px !important");
                $(".dataTables_filter input[type='text'], .dataTables_filter input[type='search']").css({position: "relative", right: "27px"});
                $("#" + datatableid).find("thead").find("tr").find("th").addClass("inst-2");
                $("#" + datatableid).css("margin", "0px")
                $("#" + datatableid).css("width", "100%")
                $(".table-header").css({"color": "white", "background-color": "#18a689"});

                if ($("#" + datatableid + "_wrapper .datatable_added").length == 0) {
                    $("#" + datatableid).wrap("<div style='overflow-x: auto;' class='datatable_added'></div>");
                }



                if (Config["datatable.opciones"] !== undefined) {
                    if (Options.length > 0) {
                        var ultimoicon;
                        var paocultarcontainersmxs = 0
                        $.each(Options[0], function (idicono, propiedades) {
                            var icono = propiedades["fa-clase"];
                            var icono2 = icono.split(' ');
                            //$.Log("#" + datatableid + " ." + icono2[1] + "," + "#" + datatableid + " ." + propiedades["icon-disabled"]);
                            $("#" + datatableid + " ." + icono2[1] + "," + "#" + datatableid + " ." + propiedades["icon-disabled"]).unbind()
                            $("#" + datatableid + " ." + icono2[1] + "," + "#" + datatableid + " ." + propiedades["icon-disabled"]).each(function (index, item) {
                                var icon = this
                                var nOpeCodigo = propiedades["nOpeCodigo"];
                                $(this).bind("click", function () {
                                    var smxstr = $($(this).parent("span").parent("a").parent("li").parent("ul").parent("div").parent("div").parent("td").parent("tr"))
                                    var mdlgtr = $($(this).parent("a").parent("div").parent("td").parent("tr"))
                                    var objDatos;
                                    var tr;
                                    if (smxstr.length > 0) {
                                        objDatos = dtConvocatoria.row(smxstr).data();
                                        tr = $(smxstr).closest('tr');
                                    } else {
                                        objDatos = dtConvocatoria.row(mdlgtr).data();
                                        tr = $(mdlgtr).closest('tr');
                                    }
                                    if (Config["ajax.opciones.extraparams"] !== undefined) {
                                        $.each(Config["ajax.opciones.extraparams"], function (epindex, epitem) {
                                            objDatos[epindex] = epitem
                                        })
                                    }
                                    var ObjDatosReplace = new Object()
                                    $.each(objDatos, function (odindex, oditem) {
                                        var str = ((oditem !== null) ? oditem.toString() : "")
                                        //if (!isHTML(str) && odindex !== "__type") {
                                        ObjDatosReplace[odindex] = str.replace(/'/g, "'")
                                        ObjDatosReplace[odindex] = ObjDatosReplace[odindex].replace(/"/g, "'")
                                        ObjDatosReplace[odindex] = ObjDatosReplace[odindex].replace(/\r?\n/g, "")
                                        ObjDatosReplace[odindex] = ObjDatosReplace[odindex].replace(/(<([^>]+)>)/ig, "")
                                        ObjDatosReplace[odindex] = ObjDatosReplace[odindex].replace(/\r?\n/g, "");
                                        ObjDatosReplace[odindex] = ObjDatosReplace[odindex].trim();
                                        //}
                                    })

                                    //objDatos = ObjDatosReplace
                                    var ocultarow = new Object();
                                    var ejecutafuncion = "";
//                                        var iconDisabled=false;
//                                        if ($(icon).parents("a").hasClass("icon-disabled") && $(icon).parents("span").parents("a").parents("li").hasClass("icon-disabled")){
//                                            iconDisabled = true;
//                                        }





                                    if (
                                        (($(icon).parents("a").hasClass("icon-disabled") == true && $(icon).parents("span").parents("a").parents("li").hasClass("icon-disabled") == false) == true)
                                        ||
                                        (($(icon).parents("a").hasClass("icon-disabled") == false && $(icon).parents("span").parents("a").parents("li").hasClass("icon-disabled") == true) == true)
                                        ) {
//                                            propiedades["show-in"]="funcion";
//                                            propiedades.funcion = propiedades["icon-disabled-funcion"] ;

                                        ejecutafuncion = propiedades["icon-disabled-funcion"] + "('" + JSON.stringify(ObjDatosReplace) + "')"
                                        eval(ejecutafuncion)
                                        return;

                                    }
//                                        alert( propiedades["show-in"]);
//                                        alert( propiedades["icon-disabled-funcion"]);
                                    switch (propiedades["show-in"]) {
                                        case "popup":

                                            var anchoyalto = ((propiedades["show-in-width"] !== undefined && propiedades["show-in-height"] !== undefined) ? (",'" + propiedades["show-in-width"] + "','" + propiedades["show-in-height"] + "'") : "");
                                            ejecutafuncion = "PopupDataTable('" + propiedades["ajax.url"] + "','" + propiedades["show-in-title"] + "'," + JSON.stringify(ObjDatosReplace) + anchoyalto + ")";

                                            eval(ejecutafuncion)
                                            break;
                                        case "confirm":
                                            var functionno
                                            //alert(nOpeCodigo);
                                            ejecutafuncion = "ConfirmDataTableGeneral('" + propiedades["ajax.url"] + "','" + JSON.stringify(ObjDatosReplace) + "'," + ((propiedades["ajax-message"] !== undefined) ? (JSON.stringify(propiedades["ajax-message"])) : "''") + "," + JSON.stringify(propiedades["ajax-success"]) + "," + nOpeCodigo + ")";
                                            functionno = "" + ((propiedades["confirm-cancel"] !== undefined) ? (propiedades["confirm-cancel"] + "('" + JSON.stringify(ObjDatosReplace) + ")") : undefined);
                                            msgboxCustomConfirm(((propiedades["confirm-title"] !== undefined) ? propiedades["confirm-title"] : "Confirmar"), ((propiedades["confirm-message"] !== undefined) ? propiedades["confirm-message"] : '¿Deseas eliminar el registro seleccionado?'), ejecutafuncion, functionno, ((propiedades["confirm-button"] !== undefined) ? propiedades["confirm-button"] : "Confirmar"));
                                            break;
                                        case "funcion":
                                            ejecutafuncion = propiedades.funcion + "('" + JSON.stringify(ObjDatosReplace) + "')";

                                            eval(ejecutafuncion)
                                            break;
                                        case "details":
                                            var row = dtConvocatoria.row(tr);
                                            if (row.child.isShown()) {
                                                row.child.hide();
                                                $(icon).removeClass('fa-search-minus');
                                                $(icon).parent("span").parent("a").attr("data-original-title", "Ver más")
                                            } else {
                                                ocultarow[datatableid + row[0]] = row;
                                                if (ocultarow[datatableid + row[0]] === undefined) {
                                                    ocultarow["count"] = ocultarow["count"] + 1
                                                }
                                                row.child(DataTableDetails(row.data(), ((propiedades["data-details"] !== undefined) ? propiedades["data-details"] : {}))).show();
                                                $(".DataTableDetailsMDLG").parent("td").attr("class", "")
                                                $(icon).addClass('fa-search-minus');
                                                $(icon).parent("span").parent("a").attr("data-original-title", "Ver menos")
                                            }
                                            break;
                                        case "row":
                                            var htmltorowedit = ((smxstr.length > 0) ? smxstr : mdlgtr)
                                            EditarInRow(htmltorowedit[0]);
                                            break;



                                    }
                                })
                                //}

//                                    else{  
//                                    ultimoicon=icon;
//                                    paocultarcontainersmxs++;
//                                       
//                                    
//                                    }
                            })
//                                if(paocultarcontainersmxs>0)
//                                {
//                                    $(ultimoicon).parents("span").parents("a").parents("li").parent("ul").parent("div").parent("div").hide();
//                                }

                        });


                    }




                }



                if (Config["datatable.funcion.complete"] !== undefined) {
                    eval(Config["datatable.funcion.complete"] + "('" + datatableid + "')");
                }

                $('[data-rel="tooltip"]').tooltip({placement: tooltip_placement});
                $('[data-toggle="tooltip"]').tooltip()


                if (Config["hide_controls"] !== undefined) {
                    if (Config["hide_controls"]["title"] !== undefined) {
                        $("#" + datatablecontainer).find(".table-header").hide();
                    }
                    if (Config["hide_controls"]["header"] !== undefined) {
                        $("#" + datatablecontainer).find(".dataTables_length").parent("div").parent("div").hide();
                    }
                    if (Config["hide_controls"]["footer"] !== undefined) {
                        $("#" + datatablecontainer).find(".dataTables_info").parent("div").parent("div").hide();
                    } else {

                        if (parseInt(Config["datatable.iDisplayLength"]) >= parseInt(data.length)) {
                            $("#" + datatablecontainer).find(".dataTables_info").parent("div").parent("div").hide();
                        } else {
                            $("#" + datatablecontainer).find(".dataTables_info").parent("div").parent("div").show();
                        }

                        //$("#"+datatablecontainer).find(".dataTables_info").parent("div").parent("div").hide();
                    }
                    if (Config["hide_controls"]["thead"] !== undefined) {
                        $("#tbl_cnt_fil_afp_afps").find("thead").hide();
                    }
                }

                //if(Config["datatable.rowsGroup"]==="undefined"){
                //    dtConvocatoria.rowGroup().disable();
                //}


                $("#" + datatableid + "_wrapper").removeClass('form-inline dt-bootstrap no-footer');
            }


//                    }else{
//                        //$("#"+datatablecontainer)
//                        msjAlerta("#"+datatablecontainer,"Sin coincidencias para su búsqueda");
//                    }


        },
        error: function (result) {
            //Cargando(0);
            $.toast(ALERTA_TITULO, "Error inesperado procesando su solicitud.", 'error')
        }
    });

    return data;
}


//tooltip placement on right or left
function tooltip_placement(context, source) {
    var $source = $(source);
    var $parent = $source.closest('table')
    var off1 = $parent.offset();
    var w1 = $parent.width();
    var off2 = $source.offset();
    if (parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2))
        return 'right';
    return 'left';
}

function isHTML(str) {
    var a = document.createElement('div');
    a.innerHTML = str;
    for (var c = a.childNodes, i = c.length; i--; ) {
        if (c[i].nodeType == 1)
            return true;
    }
    return false;
}

function ShowModal(title, htmlData, Width, Height, AutoRemove = true, cAgrupPopup = "modal_popup_general") {
    if (AutoRemove == true) {
        $("." + cAgrupPopup).remove();
    }

    var a = 1;
    var b = 1000;
    var randomnumber = (a + Math.floor(Math.random() * b));
    var html = "";
    html = html + '<div   class="modal fade  ' + cAgrupPopup + '" role="dialog" aria-labelledby="gridSystemModalLabel" id="popup' + randomnumber + '"  style="z-index: 1001"><div class="modal-dialog" role="document" style="' + ((Width == undefined) ? "max-width: 500px" : "width : " + Width) + '"> <div class="modal-content">';
    html = html + '<div class="modal-header" style="background: #BA620E; padding: 9px;cursor:move "><button type="button" class="close" data-dismiss="modal" aria-label="Close" style="right: 12px;top: 15px;color: black;"> <span aria-hidden="true" >&times;</span></button><h4 class="modal-title" id="title_modal" style="color:white">' + title + '</h4></div>';
    html = html + '<div class="modal-body"   style="overflow-y:auto;  ' + ((Height === undefined) ? "; max-height: 500px" : "max-height:" + Height) + '  ;"><div class="container-fluid"> <div class="row">';
    html = html + '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="popup_contenido' + randomnumber + '"></div>';
    html = html + '</div></div></div>';
    html = html + '<div class="modal-footer" style="padding: 4px 15px 4px 0px;"> <button type="button" class="btn btn-grey btn-xs" data-dismiss="modal">  Cerrar</button></div>';
    html = html + '</div></div></div>';
    $('body').append(html);
    $('#popup_contenido' + randomnumber).html(htmlData)
    $('#popup' + randomnumber).modal("show");
    setTimeout(function () {
        $(".modal-backdrop").fadeOut("slow");
        setTimeout(function () {
            $("#popup" + randomnumber + " .modal-header" + ",#popup" + randomnumber + " .close").css("margin-top", "-4px")
            $('#popup' + randomnumber).css({
                "background-color": "#000",
                "left": "0",
                "position": "absolute",
                "right": "0",
                "top": "0",
                "width": "100%",
                /* Fallback for web browsers that doesn't support RGBa */
                "background": "rgb(0, 0, 0)",
                /* RGBa with 0.6 opacity */
                "background": "rgba(0, 0, 0, 0.6)"
            });
        }, 10);
    }
    , 200);
    $(".modal-dialog").draggable({
        handle: ".modal-header"
    });
    return  'popup' + randomnumber
}