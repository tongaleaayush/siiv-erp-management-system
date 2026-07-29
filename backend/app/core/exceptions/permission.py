from .base import AppException


class PermissionException(AppException):

    def __init__(
        self,
        message="Permission denied."
    ):

        super().__init__(
            message,
            status_code=403
        )