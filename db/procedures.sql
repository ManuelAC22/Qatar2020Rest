drop PROCEDURE `obtener_programaciones`;
CREATE PROCEDURE `obtener_programaciones`()
    SELECT
        pro.cod_partido,
        pai2.pais as pais_principal,
        pai2.image as imagen_principal,
        pai3.pais as pais_secundario,
        pai3.image as imagen_secundario,
        pro.fecha
    FROM
        programacion pro
    JOIN PAISES pai2 ON
        pro.cod_pais1 = pai2.cod
    JOIN PAISES pai3 ON
        pro.cod_pais2 = pai3.cod

drop PROCEDURE `obtener_programacion_personalizada`;
CREATE PROCEDURE `obtener_programacion_personalizada`(in codigo_encuentro int)
    SELECT
        pro.cod_partido,
        pai2.pais as pais_principal,
        pai2.image as imagen_principal,
        pai3.pais as pais_secundario,
        pai3.image as imagen_secundario,
        pro.fecha
    FROM
        programacion pro
    JOIN PAISES pai2 ON
        pro.cod_pais1 = pai2.cod
    JOIN PAISES pai3 ON
        pro.cod_pais2 = pai3.cod
    where cod_partido = codigo_encuentro


UPDATE paises SET pais = REPLACE(pais,'á','a');
UPDATE paises SET pais = REPLACE(pais,'é','e');
UPDATE paises SET pais = REPLACE(pais,'í','i');
UPDATE paises SET pais = REPLACE(pais,'ó','o');
UPDATE paises SET pais = REPLACE(pais,'ú','u');

/*drop PROCEDURE sp_venta_entradas;*/

CREATE PROCEDURE sp_venta_entradas (in codigo_partido_temp int,in cant_entradas int,
                                   in codigo_persona char(8))

BEGIN

DECLARE vcodigo_partido_temp int;
declare vcant_entradas int;
declare vcodigo_persona char(8);
declare vcodigo_mensaje int;
declare vcodigo_entrada int;
declare vcontador int;
declare vnumero_entrada int;

set vcodigo_partido_temp = codigo_partido_temp;
set vcant_entradas = cant_entradas;
set vcodigo_persona = codigo_persona;

set vcodigo_mensaje = (SELECT ifnull(max(cod_venta), 0) + 1 from venta);
set vcodigo_entrada = (SELECT ifnull(max(cod_entradas), 0) + 1 from cod_entradas);
set vcontador = 1;
                      
INSERT INTO `venta`(`cod_venta`, `cod_persona`, `total`, `fecha_com`) 
VALUES (vcodigo_mensaje,vcodigo_persona,(vcant_entradas * 35.00),CURRENT_DATE());

while(vcontador <= vcant_entradas) DO

set vnumero_entrada = (select ifnull(max(num_entrada),0) +1 from entradas where cod_partido = vcodigo_partido_temp);

INSERT INTO `entradas`(`cod_entradas`, `cod_partido`, `num_entrada`) 
VALUES (vcodigo_entrada,vcodigo_partido_temp,vnumero_entrada);


INSERT INTO `det_venta`(`cod_venta`, `cod_entrada`) 
VALUES (vcodigo_mensaje,vcodigo_entrada);

SET vcontador = vcontador + 1;

end WHILE;

end