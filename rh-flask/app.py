# app.py
import os
from flask import Flask
from extensions import db, migrate, ma, cors
from api.empleados import empleados_bp  # Importamos el blueprint

def create_app():
    app = Flask(__name__)

    # Configuración de la base de datos (usa variables de entorno si existen)
    default_db = "mysql+pymysql://root:admin@db:3306/empleados_db"
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", default_db)
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JSON_SORT_KEYS"] = False

    # Inicializar extensiones
    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})

    # Registrar blueprint de empleados
    app.register_blueprint(empleados_bp)

    # Ruta raíz
    @app.route("/")
    def index():
        return {"message": "API Empleados activa. Endpoint base: /api/empleados"}, 200

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0', port=5000)
