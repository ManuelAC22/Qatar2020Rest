<?php

class EntradaBean {
    public $cod_entradas;
    public $cod_partido;
	public $partido_1;
    public $partido_2;
    public $fecha_partido;	
    public $num_entradas;
    
    function getCodEntrada() {
        return $this->cod_entradas;
    }

    function getCodPartido() {
        return $this->cod_partido;
    }

    function getNumEntrada() {
        return $this->num_entradas;
    }
	
	function getPartido1() {
        return $this->partido_1;
    }

    function getPartido2() {
        return $this->partido_2;
    }

    function getFechaPartido() {
        return $this->fecha_partido;
    }
    
    function setCodEntrada($cod_entradas) {
        $this->cod_entradas = $cod_entradas;
    }

    function setCodPartido($cod_partido) {
        $this->cod_partido = $cod_partido;
    }

    function setNumEntrada($num_entradas) {
        $this->num_entradas = $num_entradas;
    }
	
	function setPartido1($partido_1) {
        $this->partido_1 = $partido_1;
    }

    function setPartido2($partido_2) {
        $this->partido_2 = $partido_2;
    }

    function setFechaPartido($fecha_partido) {
        $this->fecha_partido = $fecha_partido;
    }
	
}