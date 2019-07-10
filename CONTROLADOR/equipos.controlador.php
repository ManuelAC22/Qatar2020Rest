<?php

if(!session_id()) session_start();
date_default_timezone_set("America/Lima");

require_once __DIR__. '/../negocio/equipos.negocio.php';

class EquiposControlador {
    
    private $equiposNegocio;
    
    public function __CONSTRUCT() {
        $this-> equiposNegocio = new EquiposNegocio();
    }

    public function cargarEquipos() {
        $data = $this->equiposNegocio->cargarEquipos();
        if(!empty($data)){
            echo $data;
        } else {
            echo '';
        }
    }

    public function guardarSeleccionado() {
        $data = $this->equiposNegocio->guardarSeleccionado($_POST['pais'], $_POST['select']);
        if(!empty($data)){
            echo $data;
        } else {
            echo '';
        }
    }
    public function cargarGrupos() {
        $data = $this->equiposNegocio->cargarGrupos();
        if(!empty($data)){
            echo $data;
        } else {
            echo '';
        }
    }

    public function guardarCabezaGrupo() {
        $data = $this->equiposNegocio->guardarCabezaGrupo($_POST['pais'], $_POST['select']);
        if(!empty($data)){
            echo $data;
        } else {
            echo '';
        }
    }
    public function generarGrupos() {
        $data = $this->equiposNegocio->generarGrupos($_POST['clave']);
        if(!empty($data)){
            echo $data;
        } else {
            echo '';
        }
    }
    public function cargarProgramacion() {
        $data = $this->equiposNegocio->cargarProgramacion();
        if(!empty($data)){
            echo $data;
        } else {
            echo '';
        }
    }
    
}