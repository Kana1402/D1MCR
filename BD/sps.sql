-- ========================================================
-- PROCEDIMIENTOS ALMACENADOS
-- ========================================================
DELIMITER //

-- CU-01: Registro de Usuarios
CREATE PROCEDURE SP_RegistroUsuario(
    IN p_nombre VARCHAR(150),
    IN p_correo VARCHAR(150),
    IN p_contrasena_hash VARCHAR(255)
)
BEGIN
    IF EXISTS (SELECT 1 FROM Usuarios WHERE correo = p_correo) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El correo ya se encuentra registrado.';
    ELSE
        INSERT INTO Usuarios (nombre_completo, correo, contrasena_hash)
        VALUES (p_nombre, p_correo, p_contrasena_hash);
    END IF;
END //

-- CU-02: Inicio de Sesión
CREATE PROCEDURE SP_ObtenerUsuarioLogin(
    IN p_correo VARCHAR(150)
)
BEGIN
    SELECT id_usuario, nombre_completo, contrasena_hash, rol, estado 
    FROM Usuarios 
    WHERE correo = p_correo AND estado = 'ACTIVO';
END //

-- CU-03: Gestión de Perfil
CREATE PROCEDURE SP_ObtenerPerfil(
    IN p_id_usuario INT
)
BEGIN
    SELECT nombre_completo, correo, rol, es_miembro_oficial, fecha_registro 
    FROM Usuarios 
    WHERE id_usuario = p_id_usuario AND estado = 'ACTIVO';
END //

-- CU-04: Visualización de Nosotros (Junta Directiva)
CREATE PROCEDURE SP_ObtenerJuntaDirectiva()
BEGIN
    SELECT id_miembro, nombre_completo, cargo, url_fotografia 
    FROM Junta_Directiva 
    ORDER BY orden_jerarquia ASC;
END //

-- CU-05: Consulta de programas y ejes
CREATE PROCEDURE SP_ObtenerTematicas()
BEGIN
    SELECT id_tematica, nombre, descripcion, estado 
    FROM Tematicas 
    WHERE estado = 'ACTIVO';
END //

-- CU-06: Galería de testimonios
CREATE PROCEDURE SP_ObtenerTestimonios()
BEGIN
    SELECT 
        t.id_testimonio,
        u.nombre_completo,
        p.titulo AS proyecto,
        t.contenido,
        t.url_video,
        t.fecha_publicacion
    FROM Testimonios t
    INNER JOIN Usuarios u ON t.id_usuario = u.id_usuario
    INNER JOIN Proyectos p ON t.id_proyecto = p.id_proyecto
    WHERE t.aprobado = TRUE
    ORDER BY t.fecha_publicacion DESC;
END //

-- CU-07: Catálogo de proyectos (Activos/Pasados)
CREATE PROCEDURE SP_ObtenerProyectos(
    IN p_estado VARCHAR(20)
)
BEGIN
    SELECT 
        p.id_proyecto, 
        p.titulo, 
        p.descripcion, 
        p.fecha_inicio, 
        p.fecha_fin, 
        t.nombre AS tematica
    FROM Proyectos p
    LEFT JOIN Tematicas t ON p.id_tematica = t.id_tematica
    WHERE (p_estado IS NULL OR p.estado = p_estado)
    ORDER BY p.fecha_inicio DESC;
END //

-- CU-08: Inscripción a actividades
CREATE PROCEDURE SP_InscribirProyecto(
    IN p_id_usuario INT,
    IN p_id_proyecto INT
)
BEGIN
    DECLARE v_estado VARCHAR(20);

    SELECT estado INTO v_estado FROM Proyectos WHERE id_proyecto = p_id_proyecto;

    IF v_estado IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El proyecto especificado no existe.';
    ELSEIF v_estado != 'ACTIVO' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El proyecto no está activo para inscripciones.';
    ELSEIF EXISTS (SELECT 1 FROM Asistencias WHERE id_usuario = p_id_usuario AND id_proyecto = p_id_proyecto) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El usuario ya está inscrito en este proyecto.';
    ELSE
        INSERT INTO Asistencias (id_usuario, id_proyecto) VALUES (p_id_usuario, p_id_proyecto);
    END IF;
END //

-- CU-09: Control de proyectos (Crear)
CREATE PROCEDURE SP_CrearProyecto(
    IN p_id_tematica INT,
    IN p_titulo VARCHAR(200),
    IN p_descripcion TEXT,
    IN p_fecha_inicio DATETIME,
    IN p_fecha_fin DATETIME
)
BEGIN
    IF p_fecha_inicio >= p_fecha_fin THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La fecha de inicio debe ser menor a la fecha de fin.';
    ELSE
        INSERT INTO Proyectos (id_tematica, titulo, descripcion, fecha_inicio, fecha_fin, estado)
        VALUES (p_id_tematica, p_titulo, p_descripcion, p_fecha_inicio, p_fecha_fin, 'ACTIVO');
    END IF;
END //

-- CU-09 (Complemento): Actualizar un proyecto existente
CREATE PROCEDURE SP_ActualizarProyecto(
    IN p_id_proyecto INT,
    IN p_id_tematica INT,
    IN p_titulo VARCHAR(200),
    IN p_descripcion TEXT,
    IN p_fecha_inicio DATETIME,
    IN p_fecha_fin DATETIME
)
BEGIN
    IF p_fecha_inicio >= p_fecha_fin THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La fecha de inicio debe ser menor a la fecha de fin.';
    ELSE
        UPDATE Proyectos 
        SET id_tematica = p_id_tematica,
            titulo = p_titulo,
            descripcion = p_descripcion,
            fecha_inicio = p_fecha_inicio,
            fecha_fin = p_fecha_fin
        WHERE id_proyecto = p_id_proyecto;
    END IF;
END //

-- CU-10: Gestión de junta directiva
CREATE PROCEDURE SP_ActualizarMiembroJunta(
    IN p_id_miembro INT,
    IN p_cargo VARCHAR(100),
    IN p_url_foto VARCHAR(255)
)
BEGIN
    UPDATE Junta_Directiva 
    SET cargo = p_cargo, url_fotografia = p_url_foto 
    WHERE id_miembro = p_id_miembro;
END //

-- CU-11: Administración de temáticas
CREATE PROCEDURE SP_CrearTematica(
    IN p_nombre VARCHAR(100),
    IN p_descripcion TEXT
)
BEGIN
    INSERT INTO Tematicas (nombre, descripcion) 
    VALUES (p_nombre, p_descripcion);
END //

-- CU-12: Control de Usuarios registrados
CREATE PROCEDURE SP_BuscarUsuarios(
    IN p_termino VARCHAR(150)
)
BEGIN
    SELECT 
        id_usuario, 
        nombre_completo, 
        correo, 
        rol, 
        es_miembro_oficial, 
        fecha_registro 
    FROM Usuarios
    WHERE nombre_completo LIKE CONCAT('%', p_termino, '%') 
       OR correo LIKE CONCAT('%', p_termino, '%')
    ORDER BY fecha_registro DESC;
END //

-- CU-13: Promoción a miembros de la ONG
CREATE PROCEDURE SP_PromoverMiembro(
    IN p_id_usuario INT
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Usuarios WHERE id_usuario = p_id_usuario) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El usuario especificado no existe.';
    ELSE
        UPDATE Usuarios
        SET es_miembro_oficial = TRUE
        WHERE id_usuario = p_id_usuario;
    END IF;
END //

-- CU-14: Reporte de Asistencia general
CREATE PROCEDURE SP_ReporteAsistencia(
    IN p_id_proyecto INT
)
BEGIN
    SELECT 
        u.id_usuario,
        u.nombre_completo,
        u.correo,
        u.es_miembro_oficial,
        a.fecha_inscripcion,
        a.asistio
    FROM Asistencias a
    INNER JOIN Usuarios u ON a.id_usuario = u.id_usuario
    WHERE a.id_proyecto = p_id_proyecto
    ORDER BY a.fecha_inscripcion ASC;
END //

-- CU-14 / CU-15 (Complemento): Marcar asistencia de un usuario
CREATE PROCEDURE SP_MarcarAsistencia(
    IN p_id_usuario INT,
    IN p_id_proyecto INT,
    IN p_asistio BOOLEAN
)
BEGIN
    UPDATE Asistencias
    SET asistio = p_asistio
    WHERE id_usuario = p_id_usuario AND id_proyecto = p_id_proyecto;
END //

-- CU-15: Dashboard de estadísticas
CREATE PROCEDURE SP_DashboardTopVoluntarios()
BEGIN
    SELECT 
        u.id_usuario, 
        u.nombre_completo, 
        COUNT(a.id_proyecto) AS total_asistencias
    FROM Usuarios u
    INNER JOIN Asistencias a ON u.id_usuario = a.id_usuario
    WHERE a.asistio = TRUE
    GROUP BY u.id_usuario, u.nombre_completo
    ORDER BY total_asistencias DESC
    LIMIT 5;
END //


DELIMITER ;