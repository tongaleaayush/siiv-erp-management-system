from .base import AppException


class NotFoundException(AppException):

    def __init__(
        self,
        message="Resource not found.",
    ):

        super().__init__(
            message=message,
            status_code=404,
        )