
DROP procedure IF EXISTS `sp_adm_s_equipos`;

DELIMITER $$
CREATE PROCEDURE `sp_adm_s_equipos`()
BEGIN


SELECT 
	`cod`, 
    `pais`, 
    `clasificado`, 
    `imagen` 
FROM `paises`;

END$$

DELIMITER ;
