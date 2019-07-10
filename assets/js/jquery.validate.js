/* ------------------------------------------------------
ver: 0.2
Validación de formularios con el soporte para NET
----------------------------------------------------------
autor Kamil Selwa 09.03.2010
----------------------------------------------------------
requiere jquery > 1.2.3  http://jquery.com
-----------------------------------------------------------
incorporadas reglas de validación:
    required
    email
    date
    int
    float
    number
    alpha

Validator solo validará las reglas que poseen mensages de error en errorMessages.
Las cambos requeridos dependientes de estado de otros campos necesitan contener en el nombre "required" ej "required_otrocampo"
-----------------------------------------------------------
USO:
* Añadir nombre de regla en la clase de elemento del formulario ej:
    <input id="email" class="required email" ></input>
    
* Elemento de formulario debe estar dentro de label con el span adelante ej:
    <label for="fecha">
        <span>Fecha:</span>
        <input id="fecha" class="required date" ></input>
    </label>
    
* inicialización ej:
    var errorMessages = {
        email:"el email no valido",
        required:"este campo es obligatorio
    }
    
    $("fieldset").validate( {  } );  
                                   
--------------------------------------------------------
MODIFICACIONES
* Para añadir reglas adicionales:
   añadir nombre de regla con el mensage al errorMessages ej:
        errorMessages.nombre_regla = "mensaje de error"
   añadir regla ej:
        rules.nombre_regla = { test:function(e) { return ( e == 5 ) }  }
        

--------------------------------------------------------*/

// blog.davglass.com
printf = function() { 
    var num = arguments.length; 
    var oStr = arguments[0];   
    for (var i = 1; i < num; i++) { 
        var pattern = "\\{" + (i-1) + "\\}"; 
        var re = new RegExp(pattern, "g"); 
        oStr = oStr.replace(re, arguments[i]); 
    } 
    return oStr; 
}

// var rules = rules || {};

jQuery.fn.validate = function( options) {
     
    var errorMessages = {
        email:"E-mail incorrecto",
        required:" Campo obligatorio",
        int: "Requiere un número integro",
        date: "La fecha requiere formato dd/mm/yyyy"
    };
   
    var rules = {
        required:{ test:function(e) { return( e.length > 0 ) }   }, //new RegExp(/\S/),
        email:new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i),
        date: new RegExp(/^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/), //  format dd/mm/yyyy
        int: new RegExp(/[+-]?\d+$/),
        positive_int: new RegExp(/\d+$/),
        float: new RegExp(/^([+-]?(((\d+(\.)?)|(\d*\.\d+))([eE][+-]?\d+)?))$/),
        number: { test:function(e) { return !isNaN( e ) }   },
        alpha: { test:function(e) { return isNaN( e ) }   },
        equaltoxxx: { test:function(e) { return ( e == $("#xxx").val() ) }   }  // ejemplo pocra comprobar igualdad
    };
    
    var settings = {
        live      : true, // validate on event 
        submit_element: "input.type[submit], button.type[submit], p.button a",
        show_error_msg:  function(ele) {ele.css('display', "none")},
        hide_error_msg:  function(ele) {ele.css('display', "block")},
        error_box: "span.error.",
        mark_required: true,
        submit_on_enter: true,
        error_message_element: "<span class='error {0}'>{1}</span>",
        label_element: "span",
        required_tag: "<em>*</em>"
    };
    
    if(options) {
       jQuery.extend(settings, options);
       if(options.rules){
           jQuery.extend(rules, options.rules);
       }
       if(options.errorMessages){
           jQuery.extend(errorMessages, options.errorMessages);
       }
       this.callback = options.callback
    };
    
    var container = $(this);
    
    // mark required fields with "*"
    if (settings.mark_required) {
        container.find("input.required, select.required, textarea.required, radio.required").each( function(){
            $( $(this).parent().parent().find( settings.label_element ) ).append( settings.required_tag );
        })
    }
    
    // create error messages elements
    $.each( errorMessages, function(rule, message) {
        $("." + rule).each( function(){
            var ele = $(this);
            var errBox = $( printf(settings.error_message_element, rule, message ) ).css('display','none').css('color','red')
            var ele_type = ele.attr("type")
            errBox.insertBefore(ele);
            
			if (settings.live){
                if ((ele_type == 'radio') || (ele_type == 'checkbox') ){
                    $("[name=" + ele.attr("name")+ "]" ).change(function(){
                       validateFiled($(this), rule);
                    })
                } else if (ele[0].nodeName == 'SELECT') {
                    ele.change(function(){
                       validateFiled($(this), rule);
                    }) 
                } else { 
                    ele.keyup(function(){
                       validateFiled($(this), rule);
                   }) 
                }
            }
        });
    })


    // attach submit action
    container.find(settings.submit_element).each( function(x){
        var submiter = $(this);
        var submiterId = submiter.attr('id');
        
        if (settings.submit_on_enter)  {
            //submitEnter(submiterId);
        }

        submiter.click( function(e){
            e.preventDefault();
            submitForm(submiterId)
        })
    })
    
    var validateFiled = function(field, rule){
        
        var fld_attr = field.attr('type');
        var fld_name = field.attr('name');
        
        var valid = true;
        
        // get value of the field
        var value = field.val();
        if  ( ( fld_attr == 'radio' ) || ( fld_attr == 'checkbox' ) ){
            value = $('[name="' + fld_name + '"]:checked' ).val()
            var errorLabel = field.parent().parent().find(settings.error_box + rule)
        } else {
			var errorLabel = field.parent().find(settings.error_box + rule)
        }
        value = (value == undefined)? '': value;
        
     
        if  ( value.length > 0 )  {
            valid = ( rule == "required" )? true : rules[rule].test(value);
        } else  {
			if ( rule == "required" ) {
				valid = ( value.length > 0 ) ? true: false;
			} else if ( rule.match(/required/) ) { // check for extra requirements
				//console.log( rule )
				valid = rules[rule].test(value);
			} else {
				valid = true;
			} 
        }
        
        // show/hide error message box
		if ( valid ) {
			settings.show_error_msg( errorLabel );
		} else {
			settings.hide_error_msg( errorLabel );
		}
        
        //console.log(fld_name + "   " +   rule + "   '" + value + "' valid:" + valid );
        return valid
    }
       
    var validateForm = function(){
        var validated = true;
        $.each( errorMessages, function(i, n) {
            
            container.find("input." + i + ", textarea." + i + ", select." + i ).each( function(){
                var field = $(this)
                if ( !validateFiled( field, i) ) {
                    validated = false;
                    //field.focus();
                } 
            })
        })
        return validated;
    }

    var submitEnter = function(submiterId) {
        container.find('input, select, radio, textarea').keypress(function(e) {
            // if "Enter" is pressed
            if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                return submitForm( submiterId);
            } else {
                return true
            }
        });
    }

    var submitForm = function(submiterId) {
        if ( validateForm() ) {
            if (__doPostBack) { // especific for NET
                var id = submiterId.replace("_", "$")
                __doPostBack(id, '');
                return false
            } else {
                if (container.submit){
                    container.submit();
                } else {
                    container.parrents('form').submit();
                }
            }
            return true
        } else {    
            return false
        }
    } 
    
    return container;
}