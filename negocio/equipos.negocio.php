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
    public function guardarSeleccionado($pais, $select) {
        $data = $this->equipos_modelo->guardarSeleccionado($pais, $select);
        return $this->configuraciones->setSuccess($data);
    }
    public function cargarGrupos() {
        $data = $this->equipos_modelo->cargarGrupos();
        return $this->configuraciones->setSuccess($data);
    }
    public function guardarCabezaGrupo($pais, $select) {
        $data = $this->equipos_modelo->guardarCabezaGrupo($pais, $select);
        return $this->configuraciones->setSuccess($data);
    }
    public function generarGrupos($clave) {
        $data = $this->equipos_modelo->generarGrupos($clave);
        return $this->configuraciones->setSuccess($data);
    }
    
 }