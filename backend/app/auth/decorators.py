from functools import wraps


from flask_jwt_extended import (
    get_jwt_identity,
)


from app.auth.models import User


from app.core.exceptions import (
    AuthenticationException,
    PermissionException,
)



def permission_required(permission_code):


    def decorator(function):


        @wraps(function)
        def wrapper(*args, **kwargs):


            user_id = get_jwt_identity()


            print(
                "JWT USER ID:",
                user_id
            )


            user = User.query.get(
                int(user_id)
            )


            if not user:

                raise AuthenticationException(
                    "User not found."
                )


            if not user.role:

                raise AuthenticationException(
                    "User role not assigned."
                )


            print(
                "USER:",
                user.email,
                "ROLE:",
                user.role.code
            )


            user_permissions = [

                permission.code

                for permission in user.role.permissions

            ]


            print(
                "PERMISSIONS:",
                user_permissions
            )



            if permission_code not in user_permissions:

                raise PermissionException(
                    "Permission denied."
                )



            return function(
                *args,
                **kwargs
            )


        return wrapper


    return decorator