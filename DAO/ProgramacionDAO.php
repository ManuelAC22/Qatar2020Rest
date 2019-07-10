<?php
require_once '../BEAN/ProgramacionBean.php';
require_once '../UTIL/ConexionBD.php';
class ProgramacionDAO {
    
    public function ObtenerProgramaciones(){
        try {
            $sql = "call `obtener_programaciones`() ";
            $objc = new ConexionBD();
            $cn = $objc->getconecionBD();
            $rs = mysqli_query($cn, $sql);
            $lista['PROGAMACIONES'] = array();
            while ($fila = mysqli_fetch_assoc($rs)) {
                array_push($lista['PROGAMACIONES'],
                    array('cod_partido' => $fila['cod_partido'],
                        'pais_principal' => $fila['pais_principal'],
                        'imagen_principal' => $fila['imagen_principal'],
                        'pais_secundario' => $fila['pais_secundario'],
                        'imagen_secundario' => $fila['imagen_secundario'],
                        'fecha' => $fila['fecha']));
            }
            mysqli_close($cn);
        } catch (Exception $exc) {
        }
        return $lista;
    }

    public function ObtenerProgramacionDetallada(ProgramacionBean $objbean){
        $i = 0;
        try {
            $cod_partido = $objbean->getCod_partido();
            $sql = "call `obtener_programacion_personalizada`('+$cod_partido+') ";
            $objc = new ConexionBD();
            $cn = $objc->getconecionBD();
            $rs = mysqli_query($cn, $sql);
            $lista['PROGAMACION'] = array();
            while ($fila = mysqli_fetch_assoc($rs)) {
                array_push($lista['PROGAMACION'],
                    array('cod_partido' => $fila['cod_partido'],
                        'pais_principal' => $fila['pais_principal'],
                        'imagen_principal' => $fila['imagen_principal'],
                        'pais_secundario' => $fila['pais_secundario'],
                        'imagen_secundario' => $fila['imagen_secundario'],
                        'fecha' => $fila['fecha']));
            }
            mysqli_close($cn);
        } catch (Exception $exc) {
        }
        return $lista;
    }

    public function ObtenerPaises(){
        $i = 0;
        try {
            $sql = "SELECT `cod`,`image` FROM `paises`";
            $objc = new ConexionBD();
            $cn = $objc->getconecionBD();
            $rs = mysqli_query($cn, $sql);
            $lista['PAIS'] = array();
            while ($fila = mysqli_fetch_assoc($rs)) {
                array_push($lista['PAIS'],
                    array('cod' => $fila['cod'],
                        'image' => $fila['image']));
            }
            mysqli_close($cn);
        } catch (Exception $exc) {
        }
        return $lista;
    }
/*
    public function GenerarCodigo()
    {
        $cod = 0;
        try {
            $sql = "select max(idopinion)+1 as codigo from opinion";
            $objc = new ConexionBD();
            $cn = $objc->getconecionBD();
            $rs = mysqli_query($cn, $sql);
            $consulta = mysqli_fetch_array($rs);
            $cod = $consulta['codigo'];
            if ($cod == '') {
                $cod = 1;
            }
        } catch (Exception $ex) {
            $cod = 0;
        }
        return $cod;
    }
*/
}
