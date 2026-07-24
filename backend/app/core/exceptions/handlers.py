from flask import jsonify

from app.core.exceptions import AppException


def register_exception_handlers(app):

    @app.errorhandler(AppException)
    def handle_app_exception(error):

        return jsonify(
            {
                "success": False,
                "message": error.message,
                "data": None,
                "meta": None,
                "errors": [],
            }
        ), error.status_code


    @app.errorhandler(Exception)
    def handle_unknown_exception(error):

        app.logger.exception(error)

        return jsonify(
            {
                "success": False,
                "message": "Internal server error.",
                "data": None,
                "meta": None,
                "errors": [],
            }
        ), 500