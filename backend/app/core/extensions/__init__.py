from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_restx import Api
from flask_migrate import Migrate


# =====================================================
# Database
# =====================================================

db = SQLAlchemy()


# =====================================================
# Database Migration
# =====================================================

migrate = Migrate()


# =====================================================
# JWT Authentication
# =====================================================

jwt = JWTManager()


# =====================================================
# Temporary In-Memory Token Blocklist
# =====================================================
# NOTE:
# This is temporary.
# Later we will store revoked tokens in PostgreSQL.

BLOCKLIST = set()


@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    return jti in BLOCKLIST


# =====================================================
# JWT Error Handlers
# =====================================================

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return {
        "success": False,
        "message": "Token expired. Please login again.",
        "data": None,
        "errors": [],
    }, 401


@jwt.invalid_token_loader
def invalid_token_callback(error):
    return {
        "success": False,
        "message": "Invalid authentication token.",
        "data": None,
        "errors": [],
    }, 401


@jwt.unauthorized_loader
def missing_token_callback(error):
    return {
        "success": False,
        "message": "Authorization token is missing.",
        "data": None,
        "errors": [],
    }, 401


@jwt.needs_fresh_token_loader
def fresh_token_required(jwt_header, jwt_payload):
    return {
        "success": False,
        "message": "Fresh authentication required.",
        "data": None,
        "errors": [],
    }, 401


@jwt.revoked_token_loader
def revoked_token_callback(jwt_header, jwt_payload):
    return {
        "success": False,
        "message": "Token has been revoked.",
        "data": None,
        "errors": [],
    }, 401


@jwt.token_verification_failed_loader
def token_verification_failed(jwt_header, jwt_payload):
    return {
        "success": False,
        "message": "Token verification failed.",
        "data": None,
        "errors": [],
    }, 401


# =====================================================
# Marshmallow Serialization
# =====================================================

ma = Marshmallow()


# =====================================================
# CORS
# =====================================================

cors = CORS()


# =====================================================
# Flask RESTX API
# =====================================================

api = Api(
    title="SIIV ERP Management System API",
    version="1.0.0",
    description="RESTful API for the SIIV ERP Management System",
    doc="/docs",
    prefix="/api",
    authorizations={
        "Bearer": {
            "type": "apiKey",
            "in": "header",
            "name": "Authorization",
            "description": (
                "Enter your JWT Access Token.\n\n"
                "Example:\n"
                "Bearer <JWT_TOKEN>"
            ),
        }
    },
    security="Bearer",
)