from app.repositories.ProyectoRepository import ProyectoRepository
from app.repositories.AuthRepository import AuthRepository
from app.services.ProyectoService import ProyectoService
from app.services.AuthService import AuthService

# Principio SOLID: Composición y cableado centralizado de dependencias.
# Se instancian las implementaciones concretas y se inyectan a los servicios.

_proyecto_repo = ProyectoRepository()
_proyecto_service = ProyectoService(_proyecto_repo)

_auth_repo = AuthRepository()
_auth_service = AuthService(_auth_repo)


def get_proyecto_service() -> ProyectoService:
    """Retorna la instancia del servicio de proyectos con sus dependencias resueltas."""
    return _proyecto_service


def get_auth_service() -> AuthService:
    """Retorna la instancia del servicio de autenticación con sus dependencias resueltas."""
    return _auth_service
