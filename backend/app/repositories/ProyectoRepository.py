from typing import Optional
from app.interfaces.IProyectoRepository import IProyectoRepository
from app.db import call_sp


class ProyectoRepository(IProyectoRepository):
    """
    Implementación concreta de IProyectoRepository usando MySQL stored procedures.
    """

    def obtener_proyectos(self, estado: Optional[str]) -> list:
        # call_sp recibe el nombre del SP y sus argumentos como tupla
        # SP_ObtenerProyectos(IN p_estado VARCHAR(20))
        # Si estado es None, le pasamos None a la tupla
        return call_sp("SP_ObtenerProyectos", (estado,))

    def obtener_por_id(self, id_proyecto: int) -> Optional[dict]:
        proyectos = self.obtener_proyectos(None)
        for p in proyectos:
            if p["id_proyecto"] == id_proyecto:
                return p
        return None
