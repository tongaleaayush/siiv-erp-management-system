from app.core.database.base_model import BaseModel
from app.core.extensions import db


class User(BaseModel):
    __tablename__ = "users"

    full_name = db.Column(
        db.String(150),
        nullable=False,
    )

    email = db.Column(
        db.String(255),
        unique=True,
        nullable=False,
    )

    password_hash = db.Column(
        db.String(255),
        nullable=False,
    )

    is_active = db.Column(
        db.Boolean,
        default=True,
        nullable=False,
    )

    role_id = db.Column(
        db.Integer,
        nullable=True,
    )

    def __repr__(self):
        return f"<User {self.email}>"