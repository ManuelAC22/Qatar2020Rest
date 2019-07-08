<?php


if(!session_id()) session_start();
date_default_timezone_set("America/Lima");

//require __DIR__. '/../modelo/usuario.entidad.php';
require_once __DIR__. '/../DAO/equipos.modelo.php';
require_once __DIR__. '/../CONTROLADOR/configuraciones.controlador.php';

 class EquiposNegocio {
    private $equipos_modelo;
    private $configuraciones;

    public function __CONSTRUCT() {
        $this-> equipos_modelo  = new EquiposModelo();
        $this-> configuraciones = new ConfiguracionesControlador();
    }

    public function cargarEquipos() {
        $data = $this->equipos_modelo->cargarEquipos();
        return $this->configuraciones->setSuccess($data);
    }
    
 }