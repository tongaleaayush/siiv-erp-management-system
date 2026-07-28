import bcrypt

from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
)

from app.auth.models import (
    User,
    Role,
)

from app.auth.repository import UserRepository

from app.core.exceptions import (
    DuplicateException,
    NotFoundException,
    AuthenticationException,
)


class UserService:


    @staticmethod
    def create_user(
        full_name: str,
        email: str,
        password: str,
    ):


        existing_user = (
            UserRepository.get_by_email(
                email
            )
        )


        if existing_user:
            raise DuplicateException(
                "Email already exists."
            )


        password_hash = bcrypt.hashpw(
            password.encode("utf-8"),
            bcrypt.gensalt(),
        ).decode("utf-8")



        role = Role.query.filter_by(
            code="ADMIN"
        ).first()



        if not role:
            raise NotFoundException(
                "Default role not found."
            )



        user = User(
            full_name=full_name,
            email=email,
            password_hash=password_hash,
            role=role,
        )



        return UserRepository.create(
            user
        )



    @staticmethod
    def verify_password(
        password: str,
        password_hash: str,
    ) -> bool:


        return bcrypt.checkpw(

            password.encode("utf-8"),

            password_hash.encode("utf-8"),

        )



    @staticmethod
    def login_user(
        email: str,
        password: str,
    ):


        user = (
            UserRepository.get_by_email(
                email
            )
        )



        if not user:

            raise AuthenticationException(
                "Invalid email or password."
            )



        if not user.is_active:

            raise AuthenticationException(
                "User account is inactive."
            )



        if not UserService.verify_password(
            password,
            user.password_hash,
        ):

            raise AuthenticationException(
                "Invalid email or password."
            )



        claims = {

            "role": user.role.code

            if user.role

            else None

        }



        access_token = create_access_token(

            identity=str(user.id),

            additional_claims=claims,

        )



        refresh_token = create_refresh_token(

            identity=str(user.id),

        )



        return {

            "user": user,

            "access_token": access_token,

            "refresh_token": refresh_token,

        }



    @staticmethod
    def get_current_user(
        user_id: int,
    ):


        user = (
            UserRepository.get_by_id(
                user_id
            )
        )



        if not user:

            raise NotFoundException(
                "User not found."
            )



        return user