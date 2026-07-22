from flask import Flask

import app.auth

from config import DevelopmentConfig
from app.api import register_namespaces
from app.core.extensions import api, cors, db, jwt, ma, migrate
from app.exceptions.handlers import register_error_handlers


def create_app():
    app = Flask(__name__)

    app.config.from_object(DevelopmentConfig)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    ma.init_app(app)
    cors.init_app(app)
    api.init_app(app)

    register_namespaces(api)
    register_error_handlers(app)

    return app