<?php

require_once '../BEAN/ProgramacionBean.php';
require_once '../DAO/ProgramacionDAO.php';

header('Content-Type: application/json');
$op=$_REQUEST['op'];
switch ($op){
    case 2:{
        $objdao=new ProgramacionDAO();
        $lista = $objdao->ObtenerProgramaciones();
        echo json_encode($lista);
    }
}