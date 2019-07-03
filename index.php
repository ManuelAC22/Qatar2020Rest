<?php

    if(!isset($_REQUEST['controlador'])){
        require_once 'controlador/administrador.controlador.php';
        $controller = new AdministradorControlador;
        $controller->index();
    }else{
        $controller = $_REQUEST['controlador'].'Controlador';
        $accion     = isset($_REQUEST['accion']) ? $_REQUEST['accion'] : 'Index';
        $archivo = 'controlador/' . strtolower($_REQUEST['controlador']) . '.controlador.php';
        if(file_exists($archivo)){
            require_once $archivo;
            $controller = new $controller();
            if(method_exists($controller, $accion)){
                call_user_func(array($controller, $accion));
            }else{
                call_user_func(array($controller, '')); 
            }
        }else{
            header('location: ?controlador=usuario&accion=error404');
        }
    }
?>
