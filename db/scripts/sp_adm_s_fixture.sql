DROP procedure IF EXISTS `sp_adm_s_fixture`;

DELIMITER $$
CREATE PROCEDURE `sp_adm_s_fixture`()
BEGIN


SELECT 
	p.cod_partido,
    p.cod_pais1,
    p1.pais pais1,
    p.cod_pais2,
    p2.pais pais2,
	DATE_FORMAT(p.fecha, "%d/%m/%Y") as fecha
FROM `programacion` p
inner join paises p1 on p.cod_pais1 = p1.cod
inner join paises p2 on p.cod_pais2 = p2.cod
ORDER by fecha;

END$$

DELIMITER ;