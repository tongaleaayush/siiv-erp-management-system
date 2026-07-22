import bcrypt

from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
)

from app.auth.models import User
from app.auth.repository import UserRepository
from app.exceptions.custom_exceptions import ConflictException


class UserService:
    @staticmethod
    def create_user(full_name: str, email: str, password: str):
        existing_user = UserRepository.get_by_email(email)

        if existing_user:
            raise ConflictException("Email already exists.")

        password_hash = bcrypt.hashpw(
            password.encode("utf-8"),
            bcrypt.gensalt(),
        ).decode("utf-8")

        user = User(
            full_name=full_name,
            email=email,
            password_hash=password_hash,
        )

        return UserRepository.create(user)

    @staticmethod
    def verify_password(password: str, password_hash: str) -> bool:
        """
        Verify whether the provided password matches the stored hash.
        """
        return bcrypt.checkpw(
            password.encode("utf-8"),
            password_hash.encode("utf-8"),
        )

    @staticmethod
    def login_user(email: str, password: str):
        """
        Authenticate a user using email and password.
        """

        user = UserRepository.get_by_email(email)

        if not user:
            raise ConflictException("Invalid email or password.")

        if not UserService.verify_password(password, user.password_hash):
            raise ConflictException("Invalid email or password.")

        access_token = create_access_token(
            identity=str(user.id)
        )

        refresh_token = create_refresh_token(
            identity=str(user.id)
        )

        return {
            "user": user,
            "access_token": access_token,
            "refresh_token": refresh_token,
        }