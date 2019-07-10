
DROP procedure IF EXISTS `sp_adm_i_grupo`;

DELIMITER $$
CREATE PROCEDURE `sp_adm_i_grupo`()
BEGIN

declare vgrupo nvarchar(50);
declare contador int;
declare vvez int;
/*
variables para programacion
*/
DECLARE contador2 INT;
DECLARE contador3 INT;
DECLARE contador4 INT;
DECLARE pais nvarchar(50);
DECLARE pais2 nvarchar(50);
DECLARE codpart nvarchar(50);
DECLARE fechainicial date;
DECLARE fecha date;

set fechainicial = '2022-06-15';


set vvez = (SELECT ifnull(max(vez), 0) from det_grupo);
DELETE FROM `det_grupo` WHERE `cabeza`='0';

CREATE TEMPORARY TABLE tempGrupos
SELECT @rownum:=@rownum+1 AS rownum, grupos.cod  FROM (SELECT @rownum:=0) r, grupos;

set contador = 1;

WHILE contador <= 8 DO
    set vgrupo = (SELECT cod from tempGrupos where rownum = contador);
    INSERT INTO `det_grupo`(`cod_grupo`, `cod_pais`, `cabeza`)  
    SELECT vgrupo, cod, 0 FROM paises where clasificado = '1' and cod not in (SELECT cod_pais from det_grupo) ORDER BY RAND() LIMIT 3;
    
    SET contador = contador + 1;
  END WHILE;
  
  UPDATE det_grupo SET vez = vvez+1;


/*
creamos programacion
*/
DELETE FROM programacion;

CREATE TEMPORARY TABLE tempDetGrupos(
    rownum int,
    cod_pais varchar(50)
);

CREATE TEMPORARY TABLE tempFechas(
    id int,
    fechaP date
);

set contador = 1;

WHILE contador <= 8 DO
    set vgrupo = (SELECT cod from tempGrupos where rownum = contador);
    
    DELETE FROM tempDetGrupos;
    DELETE FROM tempFechas;
    
    INSERT into tempDetGrupos
	SELECT @rownum:=@rownum+1 AS rownum, det_grupo.cod_pais  FROM (SELECT @rownum:=0) r, det_grupo where det_grupo.cod_grupo = vgrupo;
    
    INSERT into tempFechas
    SELECT 1, DATE_ADD(fechainicial, INTERVAL (round(contador/2)-1) DAY)
    UNION
    SELECT 2, DATE_ADD(fechainicial, INTERVAL (round(contador/2)+3) DAY)
    UNION
    SELECT 3, DATE_ADD(fechainicial, INTERVAL (round(contador/2)+7) DAY);
    
    set contador2 = 1;
    set contador4 = 1;
    WHILE contador2 < 4 DO
        
    	set pais = (SELECT cod_pais from tempDetGrupos where rownum = contador2);
        set contador3 = contador2 + 1;
        
            WHILE contador3 <= 4 DO
            
    			set pais2 = (SELECT cod_pais from tempDetGrupos where rownum = contador3);
                set codpart = CONCAT('G',vgrupo,(contador4));
                
                set fecha = (SELECT fechaP FROM tempFechas where id = 1);
                
                if (SELECT COUNT(*) FROM programacion p where (cod_pais1 in (pais, pais2) or  cod_pais2 in (pais, pais2)) AND p.fecha = fecha) > 0
                then 
                	set fecha = (SELECT fechaP FROM tempFechas where id = 2);
                end if;
                
                
                if (SELECT COUNT(*) FROM programacion p where (cod_pais1 in (pais, pais2) or  cod_pais2 in (pais, pais2)) AND p.fecha = fecha) > 0
                then 
                	set fecha = (SELECT fechaP FROM tempFechas where id = 3);
                end if;
                
                
                
                
               INSERT INTO `programacion`(`cod_partido`, `cod_pais1`, `cod_pais2`, `fecha`) VALUES (codpart, pais, pais2, fecha);
            	set contador4 = contador4 + 1;
                SET contador3 = contador3 + 1;
              END WHILE;
        
        
        SET contador2 = contador2 + 1;
      END WHILE;
  
    
    SET contador = contador + 1;
  END WHILE;







END$$

DELIMITER ;

