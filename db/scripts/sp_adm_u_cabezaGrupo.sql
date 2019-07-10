
DROP procedure IF EXISTS `sp_adm_u_cabezaGrupo`;

DELIMITER $$
CREATE PROCEDURE `sp_adm_u_cabezaGrupo`(IN `pais` NVARCHAR(50), IN `sel` CHAR(5))
BEGIN
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

DELIMITER ;

