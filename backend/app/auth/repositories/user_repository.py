from app.auth.models import User
from app.core.extensions import db


class UserRepository:
    @staticmethod
    def get_by_email(email: str):
        return User.query.filter_by(email=email).first()

    @staticmethod
    def get_by_id(user_id: int):
        return User.query.filter_by(id=user_id).first()

    @staticmethod
    def create(user: User):
        db.session.add(user)
        db.session.commit()
        return user