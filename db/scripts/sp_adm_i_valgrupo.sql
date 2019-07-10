
DROP procedure IF EXISTS `sp_adm_i_valgrupo`;

DELIMITER $$
CREATE PROCEDURE `sp_adm_i_valgrupo`(IN `clave` NVARCHAR(50))
BEGIN
declare vclave nvarchar(50);
declare vcantidad int;
declare vvez int;
declare vgrupo nvarchar(50);

set vclave = clave;

set vcantidad = (SELECT COUNT(*) from det_grupo where cabeza = '1');
set vvez = (SELECT ifnull(max(vez), 0) from det_grupo LIMIT 1);

if vvez > 1
THEN
    SELECT 3 as resultado;
elseif vcantidad = 8
then
    if vvez = 0
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

DELIMITER ;

