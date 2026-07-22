from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_restx import Api
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
ma = Marshmallow()
cors = CORS()

api = Api(
    title="SIIV ERP Management System API",
    version="1.0.0",
    description="RESTful API for the SIIV ERP Management System",
    doc="/docs",
    prefix="/api",
)