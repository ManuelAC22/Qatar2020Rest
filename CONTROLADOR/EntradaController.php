<?php

require_once '../BEAN/ProgramacionBean.php';
require_once '../BEAN/EntradaBean.php';
require_once '../DAO/EntradaDAO.php';

header('Content-Type: application/json');
$op=$_REQUEST['op'];
switch ($op){
    case 2:{
        $objdao=new EntradaDAO();
        $lista = $objdao->ObtenerEntradasC();
        echo json_encode($lista);
    }
}