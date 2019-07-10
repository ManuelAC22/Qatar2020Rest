-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-07-2019 a las 02:25:43
-- Versión del servidor: 10.1.28-MariaDB
-- Versión de PHP: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdqatar_mundial`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_adm_i_grupo` ()  BEGIN

declare vgrupo nvarchar(50);
declare contador int;
declare vvez int;
/*
variables para programacion
*/
DECLARE contador2 INT;
DECLARE contador3 INT;
DECLARE contador4 INT;
DECLARE pais nvarchar(50);
DECLARE pais2 nvarchar(50);
DECLARE codpart nvarchar(50);
DECLARE fechainicial date;
DECLARE fecha date;

set fechainicial = '2022-06-15';


set vvez = (SELECT ifnull(max(vez), 0) from det_grupo);
DELETE FROM `det_grupo` WHERE `cabeza`='0';

CREATE TEMPORARY TABLE tempGrupos
SELECT @rownum:=@rownum+1 AS rownum, grupos.cod  FROM (SELECT @rownum:=0) r, grupos;

set contador = 1;

WHILE contador <= 8 DO
    set vgrupo = (SELECT cod from tempGrupos where rownum = contador);
    INSERT INTO `det_grupo`(`cod_grupo`, `cod_pais`, `cabeza`)  
    SELECT vgrupo, cod, 0 FROM paises where clasificado = '1' and cod not in (SELECT cod_pais from det_grupo) ORDER BY RAND() LIMIT 3;
    
    SET contador = contador + 1;
  END WHILE;
  
  UPDATE det_grupo SET vez = vvez+1;


/*
creamos programacion
*/
DELETE FROM programacion;

CREATE TEMPORARY TABLE tempDetGrupos(
    rownum int,
    cod_pais varchar(50)
);

CREATE TEMPORARY TABLE tempFechas(
    id int,
    fechaP date
);

set contador = 1;

WHILE contador <= 8 DO
    set vgrupo = (SELECT cod from tempGrupos where rownum = contador);
    
    DELETE FROM tempDetGrupos;
    DELETE FROM tempFechas;
    
    INSERT into tempDetGrupos
	SELECT @rownum:=@rownum+1 AS rownum, det_grupo.cod_pais  FROM (SELECT @rownum:=0) r, det_grupo where det_grupo.cod_grupo = vgrupo;
    
    INSERT into tempFechas
    SELECT 1, DATE_ADD(fechainicial, INTERVAL (round(contador/2)-1) DAY)
    UNION
    SELECT 2, DATE_ADD(fechainicial, INTERVAL (round(contador/2)+3) DAY)
    UNION
    SELECT 3, DATE_ADD(fechainicial, INTERVAL (round(contador/2)+7) DAY);
    
    set contador2 = 1;
    set contador4 = 1;
    WHILE contador2 < 4 DO
        
    	set pais = (SELECT cod_pais from tempDetGrupos where rownum = contador2);
        set contador3 = contador2 + 1;
        
            WHILE contador3 <= 4 DO
            
    			set pais2 = (SELECT cod_pais from tempDetGrupos where rownum = contador3);
                set codpart = CONCAT('G',vgrupo,(contador4));
                
                set fecha = (SELECT fechaP FROM tempFechas where id = 1);
                
                if (SELECT COUNT(*) FROM programacion p where (cod_pais1 in (pais, pais2) or  cod_pais2 in (pais, pais2)) AND p.fecha = fecha) > 0
                then 
                	set fecha = (SELECT fechaP FROM tempFechas where id = 2);
                end if;
                
                
                if (SELECT COUNT(*) FROM programacion p where (cod_pais1 in (pais, pais2) or  cod_pais2 in (pais, pais2)) AND p.fecha = fecha) > 0
                then 
                	set fecha = (SELECT fechaP FROM tempFechas where id = 3);
                end if;
                
                
                
                
               INSERT INTO `programacion`(`cod_partido`, `cod_pais1`, `cod_pais2`, `fecha`) VALUES (codpart, pais, pais2, fecha);
            	set contador4 = contador4 + 1;
                SET contador3 = contador3 + 1;
              END WHILE;
        
        
        SET contador2 = contador2 + 1;
      END WHILE;
  
    
    SET contador = contador + 1;
  END WHILE;







END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_adm_i_valgrupo` (IN `clave` NVARCHAR(50))  BEGIN
declare vclave nvarchar(50);
declare vcantidad int;
declare vez int;
declare vgrupo nvarchar(50);

set vclave = clave;

set vcantidad = (SELECT COUNT(*) from det_grupo where cabeza = '1');
set vez = (SELECT ifnull(max(vez), 0) from det_grupo);

if vez >= 2
THEN
	SELECT 3 as resultado;
elseif vcantidad = 8
then
	if vez = 0
    THEN
    	CALL sp_adm_i_grupo(); 
            SELECT 1 as resultado;
    ELSE
    	if vclave = '1qaz2wsx8ik,9ol.'
        then
    		CALL sp_adm_i_grupo(); 
            SELECT 1 as resultado;
        ELSE
        	SELECT 4 as resultado;
        END if;
    end if;

ELSE
SELECT 2 as resultado;
END if;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_adm_s_equipos` ()  BEGIN


SELECT 
	`cod`, 
    `pais`, 
    `clasificado`, 
    `image` 
FROM `paises`;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_adm_s_grupos` ()  BEGIN


SELECT 
	p.`cod`, 
    p.`pais`, 
    p.`image` ,
    IFNULL(dg.cabeza, 0) cabeza,
    IFNULL(g.cod, '') cod_grupo,
    IFNULL(g.nombre, '') nombre_grupo
FROM `paises` p
LEFT JOIN det_grupo dg ON p.cod = dg.cod_pais
LEFT JOIN grupos g ON dg.cod_grupo = g.cod
where p.clasificado = '1';

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_adm_s_login` (IN `usuario` NVARCHAR(50), IN `contrasenia` NVARCHAR(100))  BEGIN

declare vusuario nvarchar(50);
declare vcontrasenia nvarchar(100);

set vusuario = usuario;
set vcontrasenia = contrasenia;

SELECT 
    a.dni,
    nombre
FROM
    administrador a INNER join persona p on a.dni = p.dni
WHERE
    a.dni = vusuario
    and a.clave = vcontrasenia
    and a.estado = 1;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_adm_u_cabezaGrupo` (IN `pais` NVARCHAR(50), IN `sel` CHAR(5))  BEGIN
declare vpais nvarchar(50);
declare vselect CHAR(5);
declare vcantidad int;
declare vez int;
declare vgrupo nvarchar(50);

set vpais = pais;
set vselect = sel;

set vcantidad = (SELECT COUNT(*) from det_grupo where cabeza = '1');
set vez = (SELECT ifnull(max(vez), 0) from det_grupo);

if vez > 0
THEN
SELECT 3 as resultado;
elseif vselect = '0'
then
	DELETE FROM `det_grupo` WHERE `cod_pais`= vpais;
	SELECT 1 as resultado;
elseif vcantidad < 8   then
    
    set vgrupo = (select cod from grupos where cod not in (SELECT cod_grupo from det_grupo) LIMIT 1);
    
	INSERT INTO `det_grupo`(`cod_grupo`, `cod_pais`, `cabeza`) VALUES (vgrupo, vpais, 1);

SELECT 1 as resultado;

ELSE
SELECT 2 as resultado;
END if;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_adm_u_equipoSeleccionado` (IN `pais` NVARCHAR(50), IN `sel` CHAR(5))  BEGIN
declare vpais nvarchar(50);
declare vselect CHAR(5);
declare vcantidad int;

set vpais = pais;
set vselect = sel;

set vcantidad = (SELECT COUNT(*) from paises where clasificado = '1');
if vselect = '0'
then
UPDATE `paises` SET `clasificado`=vselect WHERE `cod` =vpais;
SELECT 1 as resultado;
elseif vcantidad < 32   then
UPDATE `paises` SET `clasificado`=vselect WHERE `cod` =vpais;
SELECT 1 as resultado;

ELSE
SELECT 2 as resultado;
END if;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `dni` char(8) NOT NULL,
  `clave` varchar(50) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`dni`, `clave`, `estado`) VALUES
('74838082', '123456', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `det_grupo`
--

CREATE TABLE `det_grupo` (
  `cod_grupo` char(15) NOT NULL,
  `cod_pais` char(15) NOT NULL,
  `cabeza` varchar(20) NOT NULL,
  `vez` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `det_grupo`
--

INSERT INTO `det_grupo` (`cod_grupo`, `cod_pais`, `cabeza`, `vez`) VALUES
('B', 'ANG', '1', 0),
('C', 'AND', '1', 0),
('D', 'ATG', '1', 0),
('F', 'AUT', '1', 0),
('H', 'COL', '1', 0),
('A', 'AIA', '1', 0),
('E', 'ALB', '1', 0),
('G', 'ARG', '1', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `det_venta`
--

CREATE TABLE `det_venta` (
  `cod_venta` char(15) NOT NULL,
  `cod_entrada` char(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entradas`
--

CREATE TABLE `entradas` (
  `cod_entradas` char(15) NOT NULL,
  `cod_partido` char(15) NOT NULL,
  `num_entrada` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos`
--

CREATE TABLE `grupos` (
  `cod` char(15) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `grupos`
--

INSERT INTO `grupos` (`cod`, `nombre`) VALUES
('A', 'Grupo A'),
('B', 'Grupo B'),
('C', 'Grupo C'),
('D', 'Grupo D'),
('E', 'Grupo E'),
('F', 'Grupo F'),
('G', 'Grupo G'),
('H', 'Grupo H');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paises`
--

CREATE TABLE `paises` (
  `cod` char(15) NOT NULL,
  `pais` varchar(20) NOT NULL,
  `clasificado` char(5) NOT NULL,
  `image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `paises`
--

INSERT INTO `paises` (`cod`, `pais`, `clasificado`, `image`) VALUES
('AFG', 'Afganistán', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/AFG '),
('ALB', 'Albania', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/ALB '),
('GER', 'Alemania', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/GER'),
('AND', 'Andorra', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/AND '),
('ANG', 'Angola', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/ANG '),
('AIA', 'Anguila', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/AIA '),
('ATG', 'Antigua y Barbuda', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/ATG '),
('KSA', 'Arabia Saudí', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/KSA '),
('ALG', 'Argelia', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/ALG '),
('ARG', 'Argentina', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/ARG '),
('ARM', 'Armenia', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/ARM '),
('ARU', 'Aruba', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/ARU '),
('MKD', 'ARY de Macedonia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/MKD '),
('AUS', 'Australia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/AUS '),
('AUT', 'Austria', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/AUT '),
('AZE', 'Azerbaiyán', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/AZE '),
('BAH', 'Bahamas', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/BAH '),
('BHR', 'Bahréin', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/BHR '),
('BAN', 'Bangladesh', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/BAN '),
('BRB', 'Barbados', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/BRB '),
('BEL', 'Bélgica', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/BEL '),
('BLZ', 'Belice', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/BLZ '),
('BEN', 'Benín', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/BEN '),
('BER', 'Bermudas', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/BER '),
('BLR', 'Bielorrusia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/BLR '),
('BOL', 'Bolivia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/BOL '),
('BIH', 'Bosnia y Herzegovina', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/BIH '),
('BOT', 'Botsuana', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/BOT '),
('BRA', 'Brasil', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/BRA '),
('BRU', 'Brunéi Darussalam', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/BRU '),
('BUL', 'Bulgaria', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/BUL '),
('BFA', 'Burkina Faso', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/BFA '),
('BDI', 'Burundi', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/BDI '),
('BHU', 'Bután', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/BHU '),
('CPV', 'Cabo Verde', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/CPV '),
('CAM', 'Camboya', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/CAM '),
('CMR', 'Camerún', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/CMR '),
('CAN', 'Canadá', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/CAN '),
('CHA', 'Chad', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/CHA '),
('CHI', 'Chile', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/CHI '),
('TPE', 'Chinese Taipei', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/TPE '),
('CYP', 'Chipre', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/CYP '),
('COL', 'Colombia', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/COL '),
('COM', 'Comoras', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/COM '),
('CGO', 'Congo', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/CGO '),
('CIV', 'Costa de Marfil', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/CIV '),
('CRC', 'Costa Rica', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/CRC '),
('CRO', 'Croacia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/CRO '),
('CUB', 'Cuba', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/CUB '),
('CUW', 'Curazao', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/CUW '),
('DEN', 'Dinamarca', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/DEN '),
('DMA', 'Dominica', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/DMA '),
('ECU', 'Ecuador', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/ECU '),
('USA', 'EEUU', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/USA '),
('EGY', 'Egipto', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/EGY '),
('SLV', 'El Salvador', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SLV '),
('UAE', 'Emiratos Árabes Unid', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/UAE '),
('ERI', 'Eritrea', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/ERI '),
('SCO', 'Escocia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SCO '),
('SVK', 'Eslovaquia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SVK '),
('SVN', 'Eslovenia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SVN '),
('ESP', 'España', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/ESP '),
('EST', 'Estonia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/EST '),
('SWZ', 'Esuatini', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SWZ '),
('ETH', 'Etiopía', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/ETH '),
('PHI', 'Filipinas', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/PHI '),
('FIN', 'Finlandia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/FIN '),
('FIJ', 'Fiyi', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/FIJ '),
('FRA', 'Francia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/FRA '),
('GAB', 'Gabón', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/GAB '),
('WAL', 'Gales', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/WAL '),
('GAM', 'Gambia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/GAM '),
('GEO', 'Georgia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/GEO '),
('GHA', 'Ghana', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/GHA '),
('GIB', 'Gibraltar', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/GIB '),
('GRN', 'Granada', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/GRN '),
('GRE', 'Grecia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/GRE '),
('GUM', 'Guam', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/GUM '),
('GUA', 'Guatemala', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/GUA '),
('GUI', 'Guinea', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/GUI '),
('EQG', 'Guinea Ecuatorial', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/EQG '),
('GNB', 'Guinea-Bissáu', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/GNB '),
('GUY', 'Guyana', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/GUY '),
('HAI', 'Haití', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/HAI '),
('HON', 'Honduras', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/HON '),
('HKG', 'Hong Kong', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/HKG '),
('HUN', 'Hungría', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/HUN '),
('IND', 'India', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/IND '),
('IDN', 'Indonesia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/IDN '),
('ENG', 'Inglaterra', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/ENG '),
('IRQ', 'Irak', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/IRQ '),
('NIR', 'Irlanda del Norte', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/NIR '),
('ISL', 'Islandia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/ISL '),
('CAY', 'Islas Caimán', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/CAY '),
('COK', 'Islas Cook', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/COK '),
('FRO', 'Islas Feroe', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/FRO '),
('SOL', 'Islas Salomón', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SOL '),
('VGB', 'Islas Vírgenes Britá', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/VGB '),
('VIR', 'Islas Vírgenes Estad', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/VIR '),
('ISR', 'Israel', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/ISR '),
('ITA', 'Italia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/ITA '),
('JAM', 'Jamaica', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/JAM '),
('JPN', 'Japón', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/JPN '),
('JOR', 'Jordania', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/JOR '),
('KAZ', 'Kazajstán', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/KAZ '),
('KEN', 'Kenia', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/KEN '),
('KVX', 'Kosovo', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/KVX '),
('KUW', 'Kuwait', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/KUW '),
('LAO', 'Laos', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/LAO '),
('LES', 'Lesoto', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/LES '),
('LVA', 'Letonia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/LVA '),
('LBN', 'Líbano', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/LBN '),
('LBR', 'Liberia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/LBR '),
('LBY', 'Libia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/LBY '),
('LIE', 'Liechtenstein', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/LIE '),
('LTU', 'Lituania', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/LTU '),
('LUX', 'Luxemburgo', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/LUX '),
('MAC', 'Macao', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/MAC '),
('MAD', 'Madagascar', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/MAD '),
('MAS', 'Malasia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/MAS '),
('MWI', 'Malaui', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/MWI '),
('MDV', 'Maldivas', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/MDV '),
('MLI', 'Mali', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/MLI '),
('MLT', 'Malta', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/MLT '),
('MAR', 'Marruecos', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/MAR '),
('MRI', 'Mauricio', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/MRI '),
('MTN', 'Mauritania', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/MTN '),
('MEX', 'México', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/MEX '),
('MDA', 'Moldavia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/MDA '),
('MNG', 'Mongolia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/MNG '),
('MNE', 'Montenegro', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/MNE '),
('MSR', 'Montserrat', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/MSR '),
('MOZ', 'Mozambique', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/MOZ '),
('MYA', 'Myanmar', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/MYA '),
('NAM', 'Namibia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/NAM '),
('NEP', 'Nepal', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/NEP '),
('NCA', 'Nicaragua', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/NCA '),
('NIG', 'Níger', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/NIG '),
('NGA', 'Nigeria', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/NGA '),
('NOR', 'Noruega', '1', 'https://api.fifa.com/api/v1/picture/flags-sq-4/NOR '),
('NCL', 'Nueva Caledonia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/NCL '),
('NZL', 'Nueva Zelanda', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/NZL '),
('OMA', 'Omán', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/OMA '),
('NED', 'Países Bajos', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/NED '),
('PAK', 'Pakistán', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/PAK '),
('PLE', 'Palestina', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/PLE '),
('PAN', 'Panamá', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/PAN '),
('PNG', 'Papúa Nueva Guinea', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/PNG '),
('PAR', 'Paraguay', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/PAR '),
('PER', 'Perú', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/PER '),
('POL', 'Polonia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/POL '),
('POR', 'Portugal', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/POR '),
('PUR', 'Puerto Rico', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/PUR '),
('QAT', 'Qatar', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/QAT '),
('COD', 'RD del Congo', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/COD '),
('PRK', 'RDP de Corea', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/PRK '),
('CTA', 'República Centroafri', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/CTA '),
('CZE', 'República Checa', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/CZE '),
('KOR', 'República de Corea', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/KOR '),
('IRL', 'República de Irlanda', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/IRL '),
('DOM', 'República Dominicana', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/DOM '),
('KGZ', 'República Kirguisa', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/KGZ '),
('IRN', 'RI de Irán', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/IRN '),
('CHN', 'RP China', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/CHN '),
('RWA', 'Ruanda', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/RWA '),
('ROU', 'Rumanía', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/ROU '),
('RUS', 'Rusia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/RUS '),
('SAM', 'Samoa', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SAM '),
('ASA', 'Samoa Estadounidense', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/ASA '),
('SKN', 'San Cristóbal y Niev', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SKN '),
('SMR', 'San Marino', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SMR '),
('VIN', 'San Vicente y las Gr', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/VIN '),
('LCA', 'Santa Lucía', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/LCA '),
('STP', 'Santo Tomé y Príncip', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/STP '),
('SEN', 'Senegal', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SEN '),
('SRB', 'Serbia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SRB '),
('SEY', 'Seychelles', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SEY '),
('SLE', 'Sierra Leona', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SLE '),
('SIN', 'Singapur', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SIN '),
('SYR', 'Siria', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SYR '),
('SOM', 'Somalia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SOM '),
('SRI', 'Sri Lanka', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SRI '),
('RSA', 'Sudáfrica', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/RSA '),
('SDN', 'Sudán', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SDN '),
('SSD', 'Sudán del Sur', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SSD '),
('SWE', 'Suecia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SWE '),
('SUI', 'Suiza', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SUI '),
('SUR', 'Surinam', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/SUR '),
('TAH', 'Tahití', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/TAH '),
('THA', 'Tailandia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/THA '),
('TAN', 'Tanzania', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/TAN '),
('TJK', 'Tayikistán', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/TJK '),
('TLS', 'Timor Oriental', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/TLS '),
('TOG', 'Togo', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/TOG '),
('TGA', 'Tonga', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/TGA '),
('TRI', 'Trinidad y Tobago', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/TRI '),
('TUN', 'Túnez', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/TUN '),
('TCA', 'Turcas y Caicos', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/TCA '),
('TKM', 'Turkmenistán', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/TKM '),
('TUR', 'Turquía', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/TUR '),
('UKR', 'Ucrania', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/UKR '),
('UGA', 'Uganda', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/UGA '),
('URU', 'Uruguay', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/URU '),
('UZB', 'Uzbekistán', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/UZB '),
('VAN', 'Vanuatu', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/VAN '),
('VEN', 'Venezuela', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/VEN '),
('VIE', 'Vietnam', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/VIE '),
('YEM', 'Yemen', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/YEM '),
('DJI', 'Yibuti', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/DJI '),
('ZAM', 'Zambia', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/ZAM '),
('ZIM', 'Zimbabue', '0', 'https://api.fifa.com/api/v1/picture/flags-sq-4/ZIM');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `dni` char(8) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `cod_pais` char(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`dni`, `nombre`, `cod_pais`) VALUES
('74838082', 'Cristina', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programacion`
--

CREATE TABLE `programacion` (
  `cod_partido` varchar(50) NOT NULL,
  `cod_pais1` char(15) NOT NULL,
  `cod_pais2` char(15) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

CREATE TABLE `venta` (
  `cod_venta` char(15) NOT NULL,
  `cod_persona` char(15) NOT NULL,
  `total` double NOT NULL,
  `fecha_com` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`dni`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
