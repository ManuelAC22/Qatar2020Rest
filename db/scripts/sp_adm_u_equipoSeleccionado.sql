
DROP procedure IF EXISTS `sp_adm_u_equipoSeleccionado`;

DELIMITER $$
CREATE PROCEDURE `sp_adm_u_equipoSeleccionado`(IN `pais` NVARCHAR(50), IN `sel` CHAR(5))
BEGIN
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

