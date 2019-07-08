<?php
if(!session_id()) session_start();
class EquiposModelo {
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
    
    public function cargarEquipos() {
        try {
            $result = array();
            $stm = $this->pdo->prepare("CALL sp_adm_s_equipos()");
            $stm->execute();
            foreach($stm->fetchAll(PDO::FETCH_OBJ) as $r){
                $acceso = new stdClass();
                $acceso->cod   = $r->cod;
                $acceso->pais     = $r->pais;
                $acceso->clasificado     = $r->clasificado;
                $acceso->imagen     = $r->imagen;
                array_push($result, $acceso);
            }

            return $result;
        } catch (Exception $e) {
            echo die($e->getMessage());
        }
    }
}