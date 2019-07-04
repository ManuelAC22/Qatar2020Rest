<?php
require_once '../BEAN/EntradaBean.php';
require_once '../UTIL/ConexionBD.php';
class EntradaDAO {
    
    public function ObtenerEntradasC(){
        try {
            $sql = "SELECT e.cod_entradas,e.cod_partido, e.num_entrada , p.cod_pais1, p.cod_pais2, p.fecha FROM entradas e inner join programacion p on e.cod_partido = p.cod_partido where 1 = 1 ";
            $objc = new ConexionBD();
            $cn = $objc->getconecionBD();
            $rs = mysqli_query($cn, $sql);
            $lista['ENTRADAS'] = array();
            while ($fila = mysqli_fetch_assoc($rs)) {
                array_push($lista['ENTRADAS'],
                    array('cod_entradas' => $fila['cod_entradas'],
                          'cod_partido' => $fila['cod_partido'],
                          'num_entrada' => $fila['num_entrada'],
						  'cod_pais1' => $fila['cod_pais1'],
						  'cod_pais2' => $fila['cod_pais2'],
						  'fecha' => $fila['fecha']));
            }
            mysqli_close($cn);
        } catch (Exception $exc) {
        }
        return $lista;
    }
}
