from abc import ABC, abstractmethod
from typing import Optional


class IProyectoRepository(ABC):
    """
    Interfaz del repositorio de proyectos.
    Define el contrato que cualquier implementación de acceso a datos debe cumplir.
    Principio: DIP — la lógica de negocio depende de esta abstracción, no de MySQL.
    """

    @abstractmethod
    def obtener_proyectos(self, estado: Optional[str]) -> list:
        """Retorna todos los proyectos, filtrados por estado si se indica."""
        pass

    @abstractmethod
    def obtener_por_id(self, id_proyecto: int) -> Optional[dict]:
        """Retorna un proyecto por su ID, o None si no existe."""
        pass
