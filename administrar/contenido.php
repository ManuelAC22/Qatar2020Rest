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

  <title>Qatar</title>

  <!-- Bootstrap core CSS -->

  <link href="assets/css/bootstrap.min.css" rel="stylesheet">

  <link href="assets/fonts/css/font-awesome.min.css" rel="stylesheet">
  <link href="assets/css/animate.min.css" rel="stylesheet">

  <!-- Custom styling plus plugins -->
  <link href="assets/css/custom.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="assets/css/maps/jquery-jvectormap-2.0.3.css" />
  <link href="assets/css/icheck/flat/green.css" rel="stylesheet">
  <link href="assets/css/floatexamples.css" rel="stylesheet" />

  <script src="assets/js/jquery.min.js"></script>
  <link href="assets/js/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />

  <!--[if lt IE 9]>
        <script src="../assets/js/ie8-responsive-file-warning.js"></script>
        <![endif]-->

  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->

</head>


<body class="nav-md">

  <div class="container body">


    <div class="main_container">

      <div class="col-md-3 left_col">
        <div class="left_col scroll-view">

          <div class="navbar nav_title" style="border: 0;">
            <a href="#" class="site_title"><i class="fa fa-paw"></i> <span>Qatar</span></a>
          </div>
          <div class="clearfix"></div>


          <!-- menu prile quick info -->
          <div class="profile">
            <div class="profile_pic">
              <img src="assets/images/img.jpg" alt="..." class="img-circle profile_img">
            </div>
            <div class="profile_info">
              <span>Bienvenido,</span>
              <h2>Administrador</h2>
            </div>
          </div>
          <!-- /menu prile quick info -->

          <br />

          <!-- sidebar menu -->
          <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">

            <div class="menu_section">
              <h3>General</h3>
              <ul class="nav side-menu">
                <li><a href="#" class="menu_opcion" data-caso="principal"><i class="fa fa-home"></i> Principal </a>
                  
                </li>
                <li><a><i class="fa fa-edit"></i> Administrar <span class="fa fa-chevron-down"></span></a>
                  <ul class="nav child_menu" style="display: none">
                    <li><a href="#" class="menu_opcion" data-caso="equipos">Equipos</a>
                    </li>
                    <li><a href="#" class="menu_opcion" data-caso="grupos">Grupos</a>
                    </li>
                    <li><a href="#" class="menu_opcion" data-caso="fixture">Fixture</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

          </div>
          <!-- /sidebar menu -->

        </div>
      </div>

      <!-- top navigation -->
      <div class="top_nav">

        <div class="nav_menu">
          <nav class="" role="navigation">
            <div class="nav toggle">
              <a id="menu_toggle"><i class="fa fa-bars"></i></a>
            </div>

            <ul class="nav navbar-nav navbar-right">
              <li class="">
                <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                  <img src="assets/images/img.jpg" alt="">Administrador
                  <span class=" fa fa-angle-down"></span>
                </a>
                <ul class="dropdown-menu dropdown-usermenu animated fadeInDown pull-right">
                  <li><a href="#" class="cerrarSesion"><i class="fa fa-sign-out pull-right"></i> Cerrar Sesión</a>
                  </li>
                </ul>
              </li>


            </ul>
          </nav>
        </div>

      </div>
      <!-- /top navigation -->


      <!-- page content -->
      <div class="right_col" role="main">

        <br />
        <div class="contenido_principal">

        </div>

        <!-- footer content -->
        <footer>
          <div class="copyright-info">
            <p class="pull-right">Gentelella - Bootstrap Admin Template by <a href="https://colorlib.com">Colorlib</a>    
            </p>
          </div>
          <div class="clearfix"></div>
        </footer>
        <!-- /footer content -->

      </div>
      <!-- /page content -->
    </div>


  </div>

  <div id="custom_notifications" class="custom-notifications dsp_none">
    <ul class="list-unstyled notifications clearfix" data-tabbed_notifications="notif-group">
    </ul>
    <div class="clearfix"></div>
    <div id="notif-group" class="tabbed_notifications"></div>
  </div>

  <script src="assets/js/bootstrap.min.js"></script>
  <script src="assets/js/nicescroll/jquery.nicescroll.min.js"></script>

  <!-- bootstrap progress js -->
  <script src="assets/js/progressbar/bootstrap-progressbar.min.js"></script>
  <!-- icheck -->
  <script src="assets/js/icheck/icheck.min.js"></script>
  <!-- daterangepicker -->
  <script type="text/javascript" src="assets/js/moment/moment.min.js"></script>
  <script type="text/javascript" src="assets/js/datepicker/daterangepicker.js"></script>
  <!-- chart js -->
  <script src="assets/js/chartjs/chart.min.js"></script>
  <!-- sparkline -->
  <script src="assets/js/sparkline/jquery.sparkline.min.js"></script>

  <script src="assets/js/custom.js"></script>

  <!-- flot js -->
  <!--[if lte IE 8]><script type="text/javascript" src="js/excanvas.min.js"></script><![endif]-->
  <script type="text/javascript" src="assets/js/flot/jquery.flot.js"></script>
  <script type="text/javascript" src="assets/js/flot/jquery.flot.pie.js"></script>
  <script type="text/javascript" src="assets/js/flot/jquery.flot.orderBars.js"></script>
  <script type="text/javascript" src="assets/js/flot/jquery.flot.time.min.js"></script>
  <script type="text/javascript" src="assets/js/flot/date.js"></script>
  <script type="text/javascript" src="assets/js/flot/jquery.flot.spline.js"></script>
  <script type="text/javascript" src="assets/js/flot/jquery.flot.stack.js"></script>
  <script type="text/javascript" src="assets/js/flot/curvedLines.js"></script>
  <script type="text/javascript" src="assets/js/flot/jquery.flot.resize.js"></script>
  <!-- pace -->
  <script src="assets/js/pace/pace.min.js"></script>


        <script src="assets/js/datatables/jquery.dataTables.min.js"></script>
        <script src="assets/js/datatables/dataTables.bootstrap.js"></script>
<script type="text/javascript" src="assets/js/util.js"></script>
<script type="text/javascript" src="administrar/js/jsPrincipal.js"></script>
<script type="text/javascript">jsPrincipal.ready()</script>
</body>

</html>
