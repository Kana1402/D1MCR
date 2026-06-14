import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DB_HOST           = os.getenv("DB_HOST", "localhost")
    DB_PORT           = int(os.getenv("DB_PORT", 3306))
    DB_USER           = os.getenv("DB_USER", "root")
    DB_PASSWORD       = os.getenv("DB_PASSWORD", "")
    DB_NAME           = os.getenv("DB_NAME", "dale1mano_db")
    JWT_SECRET_KEY    = os.getenv("JWT_SECRET_KEY", "dale1mano_super_secreto_2026")
    JWT_EXPIRATION_H  = int(os.getenv("JWT_EXPIRATION_H", 24))
    DEBUG             = os.getenv("FLASK_DEBUG", "true").lower() == "true"
