<?php

class PersonaBean {
    public $dni;
    public $nombre;
    public $cod_pais;
    public $clave;
    public $estado;

    public function getDni() {
    	return $this->dni;
    }
    public function setDni($dni) {
        $this->dni = $dni;
    }


    public function getNombre() {
    	return $this->nombre;
    }
    public function setNombre($nombre) {
    	$this->nombre = $nombre;
    }


    public function getCod_pais() {
    	return $this->cod_pais;
    }
    public function setCod_pais($cod_pais) {
    	$this->cod_pais = $cod_pais;
    }


    public function getClave() {
    	return $this->clave;
    }
    public function setClave($clave) {
    	$this->clave = $clave;
    }


    public function getEstado() {
    	return $this->estado;
    }
    public function setEstado($estado) {
    	$this->estado = $estado;
    }


    
}