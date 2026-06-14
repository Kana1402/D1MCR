from flask import Blueprint, request, jsonify
from app.dependencies import get_proyecto_service

proyectos_bp = Blueprint("proyectos", __name__, url_prefix="/api/proyectos")


@proyectos_bp.route("", methods=["GET"], strict_slashes=False)
def obtener_proyectos():
    """
    Ruta para obtener la lista de proyectos, opcionalmente filtrada por estado.
    Cumple con SRP: solo maneja la petición HTTP, delega la lógica al servicio.
    """
    estado = request.args.get("estado")  # Puede ser ACTIVO, PASADO o None
    proyecto_service = get_proyecto_service()
    try:
        proyectos = proyecto_service.obtener_proyectos(estado)
        return jsonify(proyectos), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Error al obtener proyectos", "details": str(e)}), 500
