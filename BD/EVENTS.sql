-- ========================================================
-- CONFIGURACIÓN DEL SERVIDOR PARA EVENTOS
-- ========================================================
-- Es obligatorio habilitar el Event Scheduler en el motor de MySQL 
-- para que las tareas en segundo plano puedan ejecutarse.
SET GLOBAL event_scheduler = ON;

DELIMITER //

-- ========================================================
-- EVENTO 1: Actualización automática de estado de proyectos
-- ========================================================
-- Objetivo: Garantizar que el catálogo público esté actualizado sin 
--           intervención humana. Cambia a 'PASADO' los proyectos expirados.
-- Frecuencia: Se ejecuta todos los días a la medianoche.
DROP EVENT IF EXISTS Evt_ActualizarEstadoProyectos //

CREATE EVENT Evt_ActualizarEstadoProyectos
ON SCHEDULE EVERY 1 DAY
STARTS (TIMESTAMP(CURRENT_DATE) + INTERVAL 1 DAY)
DO
BEGIN
    UPDATE Proyectos 
    SET estado = 'PASADO' 
    WHERE fecha_fin < NOW() AND estado = 'ACTIVO';
END //

-- ========================================================
-- EVENTO 2: (Opcional - Mantenimiento) Limpieza de testimonios rechazados
-- ========================================================
-- Objetivo: Mantener la base de datos optimizada eliminando testimonios 
--           que no fueron aprobados después de 30 días de su publicación.
-- Frecuencia: Se ejecuta una vez a la semana.
DROP EVENT IF EXISTS Evt_LimpiezaTestimonios //

CREATE EVENT Evt_LimpiezaTestimonios
ON SCHEDULE EVERY 1 WEEK
STARTS CURRENT_TIMESTAMP
DO
BEGIN
    DELETE FROM Testimonios 
    WHERE aprobado = FALSE AND fecha_publicacion < DATE_SUB(NOW(), INTERVAL 30 DAY);
END //

DELIMITER ;