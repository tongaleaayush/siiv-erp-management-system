from app.core.database.base_model import BaseModel
from app.core.extensions import db
from .role_permission import role_permissions


class Role(BaseModel):

    __tablename__ = "roles"


    code = db.Column(
    db.String(50),
    unique=True,
    nullable=False,
)

    name = db.Column(
        db.String(100),
        unique=True,
        nullable=False,
    )


    description = db.Column(
        db.String(255),
        nullable=True,
    )


    is_system = db.Column(
        db.Boolean,
        nullable=False,
        default=False,
    )


    users = db.relationship(
        "User",
        back_populates="role",
        lazy="selectin",
    )


    permissions = db.relationship(
        "Permission",
        secondary=role_permissions,
        back_populates="roles",
        lazy="selectin",
    )


    def __repr__(self):

        return f"<Role {self.name}>"