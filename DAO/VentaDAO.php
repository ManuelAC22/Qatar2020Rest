<?php
require_once '../UTIL/ConexionBD.php';
class VentaDAO {

    public function RegistrarVenta($codigo_partido_temp,$cant_entradas,$codigo_persona){
        $i = 0;
        try {
            $sql = "call sp_venta_entradas ('$codigo_partido_temp','$cant_entradas','$codigo_persona')";
            $objc = new ConexionBD();
            $cn = $objc->getconecionBD();
            $i = mysqli_query($cn, $sql);
            mysqli_close($cn);
        } catch (Exception $exc) {
            $i = 0;
        }
        return $i;
    }

}