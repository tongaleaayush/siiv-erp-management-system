from functools import wraps

from flask_jwt_extended import (
    get_jwt_identity,
    verify_jwt_in_request,
)

from app.auth.models import User
from app.utils.response import error_response


def permission_required(permission_code):
    """
    Decorator to protect endpoints using permissions.
    """

    def decorator(func):

        @wraps(func)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()

            user_id = get_jwt_identity()

            user = User.query.get(user_id)

            if not user:
                return error_response(
                    message="User not found.",
                    status_code=404,
                )

            if not user.role:
                return error_response(
                    message="User has no role assigned.",
                    status_code=403,
                )

            has_permission = any(
                permission.code == permission_code
                for permission in user.role.permissions
            )

            if not has_permission:
                return error_response(
                    message="You do not have permission to perform this action.",
                    status_code=403,
                )

            return func(*args, **kwargs)

        return wrapper

    return decorator