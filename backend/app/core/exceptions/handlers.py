from app.core.exceptions import (
    AppException,
    AuthenticationException,
    PermissionException,
    NotFoundException,
    DuplicateException,
    ValidationException,
)



def register_exception_handlers(app, api=None):


    def response(message, status_code):

        return {
            "success": False,
            "message": message,
            "data": None,
            "errors": []
        }, status_code



    def handle_permission_exception(error):

        print("========== PERMISSION HANDLER ==========")
        print(type(error))
        print(error.message)

        return response(
            error.message,
            403
        )



    if api:

        api.errorhandler(PermissionException)(
            handle_permission_exception
        )



    app.register_error_handler(
        PermissionException,
        handle_permission_exception
    )



    @app.errorhandler(AuthenticationException)
    def handle_authentication_exception(error):

        return response(
            error.message,
            401
        )



    @app.errorhandler(NotFoundException)
    def handle_not_found_exception(error):

        return response(
            error.message,
            404
        )



    @app.errorhandler(DuplicateException)
    def handle_duplicate_exception(error):

        return response(
            error.message,
            409
        )



    @app.errorhandler(ValidationException)
    def handle_validation_exception(error):

        return response(
            error.message,
            400
        )



    @app.errorhandler(AppException)
    def handle_app_exception(error):

        return response(
            error.message,
            error.status_code
        )



    @app.errorhandler(Exception)
    def handle_general_exception(error):

        print(
            "UNHANDLED ERROR:",
            type(error),
            error
        )

        return response(
            "Internal Server Error",
            500
        )