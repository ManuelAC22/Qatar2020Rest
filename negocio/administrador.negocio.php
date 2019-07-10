<?php


if(!session_id()) session_start();
date_default_timezone_set("America/Lima");

//require __DIR__. '/../modelo/usuario.entidad.php';
require_once __DIR__. '/../DAO/administrador.modelo.php';
require_once __DIR__. '/../CONTROLADOR/configuraciones.controlador.php';

 class AdministradorNegocio {
    private $administrador_modelo;
    private $configuraciones;

    public function __CONSTRUCT() {
        $this-> administrador_modelo  = new AdministradorModelo();
        $this-> configuraciones = new ConfiguracionesControlador();
    }

    public function loginUsuario($usuario, $contrasenia) {
        $data = $this->administrador_modelo->loginUsuario($usuario, $contrasenia);
        if(!empty($data)) {
            $_SESSION['dni']   = $data[0]->dni;
            $_SESSION['nombre']  = $data[0]->nombre;
        }
        return $this->configuraciones->setSuccess($data);
    }
    
 }