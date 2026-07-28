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
        nullable=False,
        default=True,
    )


    role_id = db.Column(
        db.Integer,
        db.ForeignKey(
            "roles.id"
        ),
        nullable=False,
    )


    role = db.relationship(
        "Role",
        back_populates="users",
    )


    def __repr__(self):

        return f"<User {self.email}>"