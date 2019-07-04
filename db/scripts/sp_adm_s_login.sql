
DROP procedure IF EXISTS `sp_adm_s_login`;

DELIMITER $$
CREATE PROCEDURE `sp_adm_s_login`(IN `dni` varchar(50), IN `clave` VARCHAR(100))
BEGIN

declare vdni varchar(50);
declare vclave varchar(100);

set vdni = dni;
set vclave = clave;

SELECT 
    dni,
    nombre
FROM
    administrador a INNER join persona p on a.dni = p.dni
WHERE
    a.dni = vdni
    and a.clave = vclave
    and a.estado = 1

END$$

DELIMITER ;

