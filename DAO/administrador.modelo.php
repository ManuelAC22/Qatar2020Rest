<?php
if(!session_id()) session_start();
class AdministradorModelo {
    private $pdo;
    public function __CONSTRUCT(){
        try {
            require_once __DIR__ .'/../UTIL/database.php';
            $this->pdo = Database::ObtenerConexion();
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (Exception $e) {
            echo die($e->getMessage());
        }
    }
    
    public function loginUsuario($usuario, $contrasenia) {
        try {
            $result = array();
            $stm = $this->pdo->prepare("CALL sp_adm_s_login('$usuario', '$contrasenia')");
            $stm->execute();
            foreach($stm->fetchAll(PDO::FETCH_OBJ) as $r){
                $acceso = new stdClass();
                $acceso->dni   = $r->dni;
                $acceso->nombre     = $r->nombre;
                array_push($result, $acceso);
            }

            return $result;
        } catch (Exception $e) {
            echo die($e->getMessage());
        }
    }
}