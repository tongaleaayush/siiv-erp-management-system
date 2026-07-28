from flask import Flask

import app.auth
import app.customer

from config import DevelopmentConfig

from app.api import register_namespaces

from app.core.extensions import (
    api,
    cors,
    db,
    jwt,
    ma,
    migrate,
)

from app.core.exceptions.handlers import (
    register_exception_handlers,
)



def create_app():

    app = Flask(__name__)


    app.config.from_object(
        DevelopmentConfig
    )



    # Initialize extensions

    db.init_app(app)


    migrate.init_app(
        app,
        db,
    )


    jwt.init_app(app)


    ma.init_app(app)


    cors.init_app(app)



    # Initialize Flask RESTX API

    api.init_app(
        app
    )



    # Register global exception handlers

    register_exception_handlers(
        app,
        api,
    )



    # Register API namespaces

    register_namespaces(
        api
    )



    # Register CLI commands
    # Import here to avoid circular import

    from app.commands import seed_command


    app.cli.add_command(
        seed_command
    )



    return app