<?php
if (!session_id())
    session_start();

class ConfiguracionesControlador {

    public function setSuccess($data) {
        $buff = json_encode($data);
        $contentType = "application/json; charset=utf-8";
        header("Content-Type: {$contentType}");
        header("Content-Size: " . strlen($buff));
        return $buff;
    }

    public function encripta($string) {
        $output = false;
        $encrypt_method = "AES-256-CBC";
        $secret_iv = 'This is iv';
        $key = "bcb04b7e103a0cd8b54763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3";
        // hash
        $key = hash('sha256', $key);
        // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
        $iv = substr(hash('sha256', $secret_iv), 0, 16);
        $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
        $output = base64_encode($output);
        return $output;
    }

    public function desencripta($string) {
        $output = false;
        $encrypt_method = "AES-256-CBC";
        $secret_iv = 'This is iv';
        $key = "bcb04b7e103a0cd8b54763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3";
        // hash
        $key = hash('sha256', $key);
        // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
        $iv = substr(hash('sha256', $secret_iv), 0, 16);
        $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
        return $output;
    }
    public function limpiarCarateresEspeciales($s) {
	$s = str_replace("ñ","n",$s);
	$s = str_replace("Ñ","N",$s);
	$s = ereg_replace("[áàâãª]","a",$s);
	$s = ereg_replace("[ÁÀÂÃ]","A",$s);
	$s = ereg_replace("[éèê]","e",$s);
	$s = ereg_replace("[ÉÈÊ]","E",$s);
	$s = ereg_replace("[íìî]","i",$s);
	$s = ereg_replace("[ÍÌÎ]","I",$s);
	$s = ereg_replace("[óòôõº]","o",$s);
	$s = ereg_replace("[ÓÒÔÕ]","O",$s);
	$s = ereg_replace("[úùû]","u",$s);
	$s = ereg_replace("[ÚÙÛ]","U",$s);
	$s = str_replace(" ","-",$s);
	//para ampliar los caracteres a reemplazar agregar lineas de este tipo:
	//$s = str_replace("caracter-que-queremos-cambiar","caracter-por-el-cual-lo-vamos-a-cambiar",$s);
	return $s;
    }
    
    public function limpiarCaracteresEspecialesString($string){
        $string = trim($string);
 
        $string = str_replace(
            array('á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'),
            array('a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A'),
            $string
        );

        $string = str_replace(
            array('é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'),
            array('e', 'e', 'e', 'e', 'E', 'E', 'E', 'E'),
            $string
        );

        $string = str_replace(
            array('í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î'),
            array('i', 'i', 'i', 'i', 'I', 'I', 'I', 'I'),
            $string
        );

        $string = str_replace(
            array('ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'),
            array('o', 'o', 'o', 'o', 'O', 'O', 'O', 'O'),
            $string
        );

        $string = str_replace(
            array('ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'),
            array('u', 'u', 'u', 'u', 'U', 'U', 'U', 'U'),
            $string
        );

        $string = str_replace(
            array('ñ', 'Ñ', 'ç', 'Ç'),
            array('n', 'N', 'c', 'C',),
            $string
        );

        //Esta parte se encarga de eliminar cualquier caracter extraño
        $string = str_replace(
        array("¨", "º", "-", "~",
             "#", "@", "|", "!", '"',
             "·", "$", "%", "&", "/",
             "(", ")", "?", "'", "¡",
             "¿", "[", "^", "<code>", "]",
             "+", "}", "{", "¨", "´",
             ">", "<", ";", ",", ":",
             ".", " "),
        '_',
        $string
    );
 
    return $string;
    }
}
