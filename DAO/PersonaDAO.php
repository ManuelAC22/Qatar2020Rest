<?php
require_once '../BEAN/PersonaBean.php';
require_once '../UTIL/ConexionBD.php';
class PersonaDAO {

    public function RegistrarPersona(PersonaBean $objbean){
        $i = 0;
        try {
            $dni = $objbean->getDni();
            $nombre = $objbean->getNombre();
            $cod_pais = $objbean->getCod_pais();
            $sql = "INSERT INTO `persona`(`dni`, `nombre`, `cod_pais`) VALUES ('$dni','$nombre','$cod_pais')";
            $objc = new ConexionBD();
            $cn = $objc->getconecionBD();
            $i = mysqli_query($cn, $sql);
            mysqli_close($cn);
        } catch (Exception $exc) {
            $i = 0;
        }
        return $i;
    }

    public function RegistrarUsuario(PersonaBean $objbean){
        $i = 0;
        try {
            $dni = $objbean->getDni();
            $clave = $objbean->getClave();
            $sql = "INSERT INTO `administrador`(`dni`, `clave`, `estado`) VALUES ('$dni','$clave',1)";
            $objc = new ConexionBD();
            $cn = $objc->getconecionBD();
            $i = mysqli_query($cn, $sql);
            mysqli_close($cn);
        } catch (Exception $exc) {
            $i = 0;
        }
        return $i;
    }

    public function VerificarUsuario(PersonaBean $objbean){
        $i = 0;
        try {
            $dni = $objbean->getDni();
            $clave = $objbean->getClave();
            $sql = "SELECT `dni` FROM `administrador` where dni = '$dni' and clave='$clave'";
            $objc = new ConexionBD();
            $cn = $objc->getconecionBD();
            $rs = mysqli_query($cn, $sql);            
            $lista=array();
            while($fila= mysqli_fetch_assoc($rs)){
                $lista[] = $fila;
            }
            if(count($lista)==1){
                $i=1;
            }
            mysqli_close($cn);

        } catch (Exception $exc) {
            $i = 0;
        }
        return $i;
    }

}