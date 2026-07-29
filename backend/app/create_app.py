from flask import Flask

import app.auth
import app.customer
import app.product
import app.invoice
import app.payment

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

    # =====================================================
    # Initialize Extensions
    # =====================================================

    db.init_app(app)

    migrate.init_app(
        app,
        db,
    )

    jwt.init_app(app)

    ma.init_app(app)

    cors.init_app(app)

    # =====================================================
    # Initialize Flask-RESTX API
    # =====================================================

    api.init_app(
        app
    )

    # =====================================================
    # Register Global Exception Handlers
    # =====================================================

    register_exception_handlers(
        app,
        api,
    )

    # =====================================================
    # Register API Namespaces
    # =====================================================

    register_namespaces(
        api
    )

    # =====================================================
    # Register CLI Commands
    # =====================================================

    # Import here to avoid circular imports
    from app.commands import seed_command

    app.cli.add_command(
        seed_command
    )

    return app