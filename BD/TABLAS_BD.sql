-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS dale1mano_db;
USE dale1mano_db;

-- 1. Tabla de Usuarios (Módulo 1 y 5)
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    contrasena_hash VARCHAR(255) NOT NULL,
    rol ENUM('ADMIN', 'USER') DEFAULT 'USER',
    es_miembro_oficial BOOLEAN DEFAULT FALSE,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('ACTIVO', 'INACTIVO') DEFAULT 'ACTIVO'
);

-- 2. Tabla de Temáticas / Ejes (Módulo 4)
CREATE TABLE Tematicas (
    id_tematica INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    estado ENUM('ACTIVO', 'INACTIVO') DEFAULT 'ACTIVO'
);

-- 3. Tabla de Proyectos / Actividades (Módulo 3 y 4)
CREATE TABLE Proyectos (
    id_proyecto INT AUTO_INCREMENT PRIMARY KEY,
    id_tematica INT,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    estado ENUM('ACTIVO', 'PASADO', 'CANCELADO') DEFAULT 'ACTIVO',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_tematica) REFERENCES Tematicas(id_tematica) ON DELETE SET NULL
);

-- 4. Tabla de Asistencia / Inscripciones (Tabla intermedia)
CREATE TABLE Asistencias (
    id_asistencia INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_proyecto INT NOT NULL,
    fecha_inscripcion DATETIME DEFAULT CURRENT_TIMESTAMP,
    asistio BOOLEAN DEFAULT FALSE, -- Para el control final de asistencia
    UNIQUE KEY unq_inscripcion (id_usuario, id_proyecto), -- Evita duplicidad (CU-08)
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_proyecto) REFERENCES Proyectos(id_proyecto) ON DELETE CASCADE
);

-- 5. Tabla de Testimonios (Módulo 2)
CREATE TABLE Testimonios (
    id_testimonio INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_proyecto INT NOT NULL,
    contenido TEXT NOT NULL,
    url_video VARCHAR(255),
    fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    aprobado BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_proyecto) REFERENCES Proyectos(id_proyecto) ON DELETE CASCADE
);

-- 6. Tabla de Junta Directiva (Módulo 4)
CREATE TABLE Junta_Directiva (
    id_miembro INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    url_fotografia VARCHAR(255),
    orden_jerarquia INT DEFAULT 0
);