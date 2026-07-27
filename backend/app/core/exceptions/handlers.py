from flask import jsonify

from flask_jwt_extended.exceptions import (
    NoAuthorizationError,
    InvalidHeaderError,
    JWTExtendedException,
)

from app.core.exceptions.base import AppException



def register_exception_handlers(app, api):


    # =====================================================
    # Application Custom Exceptions
    # =====================================================

    @api.errorhandler(AppException)
    def handle_api_exception(error):

        return {
            "success": False,
            "message": error.message,
            "data": None,
            "errors": [],
        }, error.status_code



    @app.errorhandler(AppException)
    def handle_app_exception(error):

        return jsonify(
            {
                "success": False,
                "message": error.message,
                "data": None,
                "errors": [],
            }
        ), error.status_code



    # =====================================================
# JWT Exceptions
# =====================================================
    @api.errorhandler(NoAuthorizationError)
    def handle_missing_token(error):

       return {
        "success": False,
        "message": "Authorization token is missing.",
        "data": None,
        "errors": [],
    }, 401



    @api.errorhandler(InvalidHeaderError)
    def handle_invalid_header(error):

      return {
        "success": False,
        "message": "Invalid authorization header.",
        "data": None,
        "errors": [],
    }, 401



    @api.errorhandler(JWTExtendedException)
    def handle_jwt_exception(error):

       return {
        "success": False,
        "message": str(error),
        "data": None,
        "errors": [],
    }, 401

    # =====================================================
    # 404
    # =====================================================

    @app.errorhandler(404)
    def handle_not_found(error):

        return jsonify(
            {
                "success": False,
                "message": "Resource not found.",
                "data": None,
                "errors": [],
            }
        ), 404



    # =====================================================
    # Unknown Exception
    # =====================================================

    @api.errorhandler(Exception)
    def handle_unknown_exception(error):

        app.logger.exception(error)

        return {
            "success": False,
            "message": "Internal server error.",
            "data": None,
            "errors": [],
        }, 500