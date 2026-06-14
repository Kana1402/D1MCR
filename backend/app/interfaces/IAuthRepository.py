from abc import ABC, abstractmethod
from typing import Optional


class IAuthRepository(ABC):
    """
    Interfaz del repositorio de autenticación.
    Define el contrato para operaciones de usuario y credenciales.
    Principio: DIP — la lógica de negocio depende de esta abstracción.
    """

    @abstractmethod
    def registrar_usuario(self, nombre: str, correo: str, contrasena_hash: str) -> None:
        """Registra un nuevo usuario en el sistema."""
        pass

    @abstractmethod
    def obtener_usuario_por_correo(self, correo: str) -> Optional[dict]:
        """Obtiene un usuario por su correo para autenticación."""
        pass
