<?php 
if(!isset($_SESSION))
    session_start();

date_default_timezone_set("America/Lima");

if(isset($_SESSION['dni']) && isset($_SESSION['nombre']) && isset($_SESSION['usuario'])) {
    header("location: index.php?controlador=administrador&accion=index");
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

  <title>Administrador </title>

  <!-- Bootstrap core CSS -->

  <link href="assets/css/bootstrap.min.css" rel="stylesheet">

  <link href="assets/fonts/css/font-awesome.min.css" rel="stylesheet">
  <link href="assets/css/animate.min.css" rel="stylesheet">

  <!-- Custom styling plus plugins -->
  <link href="assets/css/custom.css" rel="stylesheet">
  <link href="assets/css/icheck/flat/green.css" rel="stylesheet">


  <script src="assets/js/jquery.min.js"></script>

  <!--[if lt IE 9]>
        <script src="../assets/js/ie8-responsive-file-warning.js"></script>
        <![endif]-->

  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->

</head>

<body style="background:#F7F7F7;">

  <div class="">
    <a class="hiddenanchor" id="toregister"></a>
    <a class="hiddenanchor" id="tologin"></a>

    <div id="wrapper">
      <div id="login" class="animate form">
        <section class="login_content">
          <form id="frmLogin" data-parsley-validate>
            <h1>Iniciar Sesión</h1>
            <div>
              <input type="text" class="form-control" placeholder="DNI" required="" id="dni"/>
            </div>
            <div>
              <input type="password" class="form-control" placeholder="Contraseña" required="" id="clave"/>
            </div>
            <div>
              <span id="respuesta"></span>
            </div>
            <div>
              <span class="btn btn-default submit" id="btnIngresar">Iniciar Sesión</span>
            </div>
            <div class="clearfix"></div>
            <div class="separator">

              <div class="clearfix"></div>
              <br />
              <div>
              </div>
            </div>
          </form>
          <!-- form -->
        </section>
        <!-- content -->
      </div>
    </div>
  </div>
  <!-- form validation -->
<script type="text/javascript" src="assets/js/util.js"></script>
<script type="text/javascript" src="administrar/js/jsLogin.js"></script>
<script type="text/javascript">jsLogin.ready()</script>
</body>

</html>
