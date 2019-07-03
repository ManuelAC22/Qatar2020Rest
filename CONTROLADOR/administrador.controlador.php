<?php

if(!session_id()) session_start();
date_default_timezone_set("America/Lima");

require_once __DIR__. '/../negocio/administrador.negocio.php';

class AdministradorControlador {
    
    private $usuarioNegocio;
    
    public function __CONSTRUCT() {
        $this-> usuarioNegocio = new AdministradorNegocio();
    }
    
    public function index() {
        require_once 'administrar/cabecera.php';
        require_once 'administrar/menu.php';
        require_once 'administrar/contenido.php';
        require_once 'administrar/pie.php';
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
    
    
    public function ingresar() {
        $data = "";//$this->usuarioNegocio->loginUsuario($_POST['usuario'], md5($_POST['contrasenia']));
        if(!empty($data)){
            echo $data;
        } else {
            echo '';
        }
    }
    public function CerrarSesion(){
        if(!session_id()) session_start();
        unset($_SESSION['dni']);
        unset($_SESSION['nombre']);
        unset($_SESSION['usuario']);
        session_destroy();
        echo '<script type="text/javascript">location.href = "index.php";</script>';
    }
    
}