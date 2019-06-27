drop PROCEDURE `obtener_programaciones`;
CREATE PROCEDURE `obtener_programaciones`()
    SELECT
        pro.cod_partido,
        pai2.pais as pais_principal,
        pai3.pais as pais_secundario,
        pro.fecha
    FROM
        programacion pro
    JOIN PAISES pai2 ON
        pro.cod_pais1 = pai2.cod
    JOIN PAISES pai3 ON
        pro.cod_pais2 = pai3.cod


UPDATE paises SET pais = REPLACE(pais,'á','a');
UPDATE paises SET pais = REPLACE(pais,'é','e');
UPDATE paises SET pais = REPLACE(pais,'í','i');
UPDATE paises SET pais = REPLACE(pais,'ó','o');
UPDATE paises SET pais = REPLACE(pais,'ú','u');