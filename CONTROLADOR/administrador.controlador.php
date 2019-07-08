<?php

if(!session_id()) session_start();
date_default_timezone_set("America/Lima");

require_once __DIR__. '/../negocio/administrador.negocio.php';

class AdministradorControlador {
    
    private $administradorNegocio;
    
    public function __CONSTRUCT() {
        $this-> administradorNegocio = new AdministradorNegocio();
    }
    
    public function index() {
        require_once 'administrar/contenido.php';
    }
    
    public function error404() {
        echo 'error44';
    }
    
    public function login() {
        $constante = $_GET['error'];
        if(empty($constante)){
            $constante = $_POST['error'];
        }
        require_once 'administrar/login.php';
    }
    
    public function vistaLogin() {
        require_once 'administrar/login.php';
    }
    
    
    public function CerrarSesion(){
        if(!session_id()) session_start();
        unset($_SESSION['dni']);
        unset($_SESSION['nombre']);
        session_destroy();
        echo '<script type="text/javascript">location.href = "index.php";</script>';
    }

    public function ingresar() {
        $data = $this->administradorNegocio->loginUsuario($_POST['dni'], $_POST['clave']);
        if(!empty($data)){
            echo $data;
        } else {
            echo '';
        }
    }
    
}