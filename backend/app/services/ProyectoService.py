from typing import Optional
from app.interfaces.IProyectoRepository import IProyectoRepository


class ProyectoService:
    """
    Servicio de proyectos (Lógica de Negocio).
    Sigue el principio de Inversión de Dependencias (DIP) al depender de IProyectoRepository.
    """

    def __init__(self, proyecto_repo: IProyectoRepository):
        self.proyecto_repo = proyecto_repo

    def obtener_proyectos(self, estado: Optional[str]) -> list:
        # Validación de estados permitidos si fuera necesario
        if estado and estado not in ["ACTIVO", "PASADO", "CANCELADO"]:
            raise ValueError(f"Estado '{estado}' no es válido.")
        return self.proyecto_repo.obtener_proyectos(estado)

    def obtener_proyecto_por_id(self, id_proyecto: int) -> Optional[dict]:
        return self.proyecto_repo.obtener_por_id(id_proyecto)
