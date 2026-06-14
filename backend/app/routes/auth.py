from flask import Blueprint, request, jsonify
from app.dependencies import get_auth_service

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@auth_bp.route("/registro", methods=["POST"], strict_slashes=False)
def registro():
    """
    Ruta para registro de usuarios.
    Cumple con SRP: delega la validación y hashing de contraseña al servicio de autenticación.
    """
    data = request.get_json() or {}
    nombre = data.get("nombre")
    correo = data.get("email") or data.get("correo")  # Soporta ambos nombres
    contrasena = data.get("password") or data.get("contrasena")  # Soporta ambos

    auth_service = get_auth_service()
    try:
        auth_service.registrar_usuario(nombre, correo, contrasena)
        return jsonify({"message": "Usuario registrado exitosamente."}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        # Si la BD tira error de duplicado, o cualquier otra cosa
        error_msg = str(e)
        if "ya se encuentra registrado" in error_msg:
            return jsonify({"error": error_msg}), 400
        return jsonify({"error": "Error al registrar el usuario", "details": error_msg}), 500


@auth_bp.route("/login", methods=["POST"], strict_slashes=False)
def login():
    """
    Ruta para inicio de sesión.
    Retorna el token JWT y los datos públicos del usuario en caso de éxito.
    """
    data = request.get_json() or {}
    correo = data.get("email") or data.get("correo")
    contrasena = data.get("password") or data.get("contrasena")

    auth_service = get_auth_service()
    try:
        resultado = auth_service.login(correo, contrasena)
        return jsonify(resultado), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 401
    except Exception as e:
        return jsonify({"error": "Error en el inicio de sesión", "details": str(e)}), 500
