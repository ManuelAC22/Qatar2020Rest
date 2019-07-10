DROP procedure IF EXISTS `sp_adm_s_grupos`;

DELIMITER $$
CREATE PROCEDURE `sp_adm_s_grupos`()
BEGIN


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

DELIMITER ;