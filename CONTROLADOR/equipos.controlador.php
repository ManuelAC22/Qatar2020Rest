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
    
}