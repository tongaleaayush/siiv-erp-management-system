from app.exceptions.custom_exceptions import AppException
from app.utils.response import error_response


def register_error_handlers(app):
    """
    Register global exception handlers.
    """

    @app.errorhandler(AppException)
    def handle_app_exception(error):
        return error_response(
            message=error.message,
            status_code=error.status_code,
        )

    @app.errorhandler(404)
    def not_found(error):
        return error_response(
            message="Resource not found.",
            status_code=404,
        )

    @app.errorhandler(500)
    def internal_server_error(error):
        return error_response(
            message="Internal server error.",
            status_code=500,
        )