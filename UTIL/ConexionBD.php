<?php class ConexionBD {
  const SERVER = "127.0.0.1";
  const USER = "root";
  const PASS = "";
  const DATABASE = "bdqatar_mundial";
  const PORT="3306";  
  private  $cn=null;
  
  public function getconecionBD() {
      try {
          return mysqli_connect(self::SERVER,self::USER, self::PASS, self::DATABASE,self::PORT);
      } catch (Exception $exc) {
        
      return $this->cn;
      }
      }
}
?>