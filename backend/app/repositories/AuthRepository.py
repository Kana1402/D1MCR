from typing import Optional
from app.interfaces.IAuthRepository import IAuthRepository
from app.db import call_sp


class AuthRepository(IAuthRepository):
    """
    Implementación concreta de IAuthRepository usando MySQL stored procedures.
    """

    def registrar_usuario(self, nombre: str, correo: str, contrasena_hash: str) -> None:
        # SP_RegistroUsuario(IN p_nombre, IN p_correo, IN p_contrasena_hash)
        call_sp("SP_RegistroUsuario", (nombre, correo, contrasena_hash))

    def obtener_usuario_por_correo(self, correo: str) -> Optional[dict]:
        # SP_ObtenerUsuarioLogin(IN p_correo)
        results = call_sp("SP_ObtenerUsuarioLogin", (correo,))
        if results and len(results) > 0:
            return results[0]
        return None
