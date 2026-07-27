from app.core.exceptions.base import AppException


class AuthenticationException(AppException):

    def __init__(
        self,
        message: str = "Authentication failed.",
    ):
        super().__init__(
            message=message,
            status_code=401,
        )