<?php

class PaisBean {
    public $cod;
    public $pais;
    public $clasificado;
    public $image;
    
    function getCod() {
        return $this->cod;
    }

    function getPais() {
        return $this->pais;
    }

    function getClasificado() {
        return $this->clasificado;
    }

    function getImage() {
        return $this->image;
    }
    
    function setCod($cod) {
        $this->cod = $cod;
    }

    function setPais($pais) {
        $this->pais = $pais;
    }

    function setClasificado($clasificado) {
        $this->clasificado = $clasificado;
    }

    function setImage($image) {
        $this->image = $image;
    }

}