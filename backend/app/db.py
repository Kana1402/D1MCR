import pymysql
from flask import current_app


def get_connection():
    """Retorna una conexión nueva a MySQL usando la configuración del app context."""
    cfg = current_app.config
    return pymysql.connect(
        host=cfg["DB_HOST"],
        port=cfg["DB_PORT"],
        user=cfg["DB_USER"],
        password=cfg["DB_PASSWORD"],
        database=cfg["DB_NAME"],
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=False,
    )


def call_sp(sp_name: str, args: tuple = ()):
    """Ejecuta un stored procedure y devuelve los resultados como lista de dicts."""
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.callproc(sp_name, args)
            rows = cur.fetchall()
        conn.commit()
        return rows
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()
