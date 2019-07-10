<?php

require_once '../BEAN/ProgramacionBean.php';
require_once '../DAO/ProgramacionDAO.php';

header('Content-Type: application/json');
$op=$_REQUEST['op'];
switch ($op){
    case 1:{
        $objdao=new ProgramacionDAO();
        $lista = $objdao->ObtenerPaises();
        echo json_encode($lista);
    }
    break;
    case 2:{
        $objdao=new ProgramacionDAO();
        $lista = $objdao->ObtenerProgramaciones();
        echo json_encode($lista);
    }
    break;
    case 3:{
        $objdao=new ProgramacionDAO();
        $objbean=new ProgramacionBean();
        $objbean->setCod_partido($_REQUEST['cod_partido']);
        $lista = $objdao->ObtenerProgramacionDetallada($objbean);
        echo json_encode($lista);
    }
    break;
}