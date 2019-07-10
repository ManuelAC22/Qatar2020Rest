<?php

require_once '../DAO/VentaDAO.php';

header('Content-Type: application/json');
$op=$_REQUEST['op'];
switch ($op){
    case 1:{
        $objdao=new VentaDAO();
        $codigo_partido_temp = ($_REQUEST['codigo_partido_temp']);
        $cant_entradas = ($_REQUEST['cant_entradas']);
        $codigo_persona = ($_REQUEST['codigo_persona']);
        $i = $objdao->RegistrarVenta($codigo_partido_temp,$cant_entradas,$codigo_persona);
        if($i==1){
            echo json_encode(1);
        }
    }
    break;
    case 2:{
        $objdao=new VentaDAO();
        $cod_persona = ($_REQUEST['cod_persona']);
        $lista = $objdao->ObtenerEntradas($cod_persona);
        echo json_encode($lista);
    }
    break;
}