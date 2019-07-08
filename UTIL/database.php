<?php


class DataBase{
    public static function ObtenerConexion(){
        $server = "localhost";
        $usuario = "root";
        $pass = "";
        $db = "bdqatar_mundial";
        return new PDO('mysql:host='.$server.';dbname='.$db, $usuario, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''));
    }
}