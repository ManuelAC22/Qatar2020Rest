<?php

require_once '../BEAN/PersonaBean.php';
require_once '../DAO/PersonaDAO.php';

header('Content-Type: application/json');
$op=$_REQUEST['op'];
switch ($op){
    case 1:{
        $objdao=new PersonaDAO();
        $objbean=new PersonaBean();
        $objbean->setDni($_REQUEST['dni']);
        $objbean->setNombre($_REQUEST['nombre']);
        $objbean->setCod_pais($_REQUEST['cod_pais']);
        $objbean->setClave($_REQUEST['clave']);
        $i=$objdao->RegistrarPersona($objbean);
        $m=$objdao->RegistrarUsuario($objbean);
        if($i==1 && $m == 1){
            echo json_encode(1);
        }else{
            echo json_encode(0);
        }
        break;
    }
    break;
    case 2:{
        $objdao=new PersonaDAO();
        $objbean=new PersonaBean();
        $objbean->setDni($_REQUEST['dni']);
        $objbean->setClave($_REQUEST['clave']);
        $i=$objdao->VerificarUsuario($objbean);
        if($i==1){
            echo json_encode(1);
        }else{
            echo json_encode(0);
        }
    }
    break;
}