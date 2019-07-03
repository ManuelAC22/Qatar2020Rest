<?php 
if(!isset($_SESSION))
    session_start();

date_default_timezone_set("America/Lima");

if(!isset($_SESSION['dni']) && !isset($_SESSION['nombre']) && !isset($_SESSION['usuario'])) {
    header("location: index.php?controlador=administrador&accion=login&error=notfound");
    exit;
}
 ?>

 <!DOCTYPE html>
<html lang="en">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <!-- Meta, title, CSS, favicons, etc. -->
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Administrador</title>

  <!-- Bootstrap core CSS -->

  <link href="assets/css/bootstrap.min.css" rel="stylesheet">

  <link href="assets/fonts/css/font-awesome.min.css" rel="stylesheet">
  <link href="assets/css/animate.min.css" rel="stylesheet">

  <!-- Custom styling plus plugins -->
  <link href="assets/css/custom.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="assets/css/maps/jquery-jvectormap-2.0.3.css" />
  <link href="assets/css/icheck/flat/green.css" rel="stylesheet" />
  <link href="assets/css/floatexamples.css" rel="stylesheet" type="text/css" />

  <script src="assets/js/jquery.min.js"></script>
  <script src="assets/js/nprogress.js"></script>

  <!--[if lt IE 9]>
        <script src="..assets/js/ie8-responsive-file-warning.js"></script>
        <![endif]-->

  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->

</head>


<body class="nav-md">
