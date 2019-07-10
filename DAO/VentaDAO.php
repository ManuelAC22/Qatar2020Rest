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

    public function ObtenerEntradas($cod_persona){
        $i = 0;
        try {
            $sql = "SELECT DISTINCT COUNT(v.cod_venta) as cantidad , pai1.pais as paisprincipal , pai2.pais as paissecundario , pai1.image as imagenPrincipal, pai2.image as imagenSecunadrio FROM `venta` v join det_venta det on v.cod_venta = det.cod_venta join entradas enr on enr.cod_entradas = det.cod_entrada join programacion pro on pro.cod_partido = enr.cod_partido join paises pai1 on pai1.cod = pro.cod_pais1 join paises pai2 on pai2.cod = pro.cod_pais2 WHERE cod_persona = '$cod_persona'";
            $objc = new ConexionBD();
            $cn = $objc->getconecionBD();
            $rs = mysqli_query($cn, $sql);
            $lista['ENTRADAS'] = array();
            while ($fila = mysqli_fetch_assoc($rs)) {
                array_push($lista['ENTRADAS'],
                    array('cantidad' => $fila['cantidad'],
                        'paisprincipal' => $fila['paisprincipal'],
                        'paissecundario' => $fila['paissecundario'],
                        'imagenPrincipal' => $fila['imagenPrincipal'],
                        'imagenSecunadrio' => $fila['imagenSecunadrio']));
            }
            mysqli_close($cn);
        } catch (Exception $exc) {
        }
        return $lista;
    }
    /*
    
    */

}