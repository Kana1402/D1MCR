from flask import Flask
from flask_cors import CORS
from app.config import Config
from app.routes.proyectos import proyectos_bp
from app.routes.auth import auth_bp


def create_app():
    """
    Factory function para inicializar la aplicación Flask.
    Configura CORS, carga los parámetros del sistema y registra los blueprints de rutas.
    """
    app = Flask(__name__)
    app.config.from_object(Config)

    # Habilitar CORS para permitir solicitudes del Frontend
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Registrar rutas (Blueprints)
    app.register_blueprint(proyectos_bp)
    app.register_blueprint(auth_bp)

    return app
