<?php

/*******************************************************************************
 * Proyecto realizado por Miller Gómez
 * Para soporte escribe a contacto@millergomez.com
 * Visita nuestra web http://www.millergomez.com
 * ****************************************************************************/
if(!session_id()) session_start();
date_default_timezone_set("America/Lima");

//require __DIR__. '/../modelo/usuario.entidad.php';
require_once __DIR__. '/../DAO/administrador.modelo.php';

 class AdministradorNegocio {
    private $usuario_modelo;

    public function __CONSTRUCT() {
        $this-> usuario_modelo  = new AdministradorModelo();
    }
    
 }