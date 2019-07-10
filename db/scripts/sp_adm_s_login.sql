
DROP procedure IF EXISTS `sp_adm_s_login`;

DELIMITER $$
CREATE PROCEDURE `sp_adm_s_login`(IN `usuario` NVARCHAR(50), IN `contrasenia` NVARCHAR(100))
BEGIN

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

DELIMITER ;

