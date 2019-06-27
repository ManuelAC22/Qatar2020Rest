<?php

class ProgramacionBean {
    public $cod_partido;
    public $cod_pais1;
    public $cod_pais2;
    public $fecha;
    
    function getCod_partido() {
        return $this->cod_partido;
    }

    function getCod_pais1() {
        return $this->cod_pais1;
    }

    function getCod_pais2() {
        return $this->cod_pais2;
    }

    function getFecha() {
        return $this->fecha;
    }
    
    function setCod_partido($cod_partido) {
        $this->cod_partido = $cod_partido;
    }

    function setCod_pais1($pais) {
        $this->cod_pais1 = $cod_pais1;
    }

    function setCod_pais2($cod_pais2) {
        $this->cod_pais2 = $cod_pais2;
    }

    function setFecha($fecha) {
        $this->fecha = $fecha;
    }

}