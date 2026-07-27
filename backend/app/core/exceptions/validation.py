from app.core.exceptions.base import AppException


class ValidationException(AppException):

    def __init__(
        self,
        message: str,
    ):
        super().__init__(
            message=message,
            status_code=400,
        )