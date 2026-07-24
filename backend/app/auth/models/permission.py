from app.core.database.base_model import BaseModel
from app.core.extensions import db
from .role_permission import role_permissions

class Permission(BaseModel):
    __tablename__ = "permissions"

    code = db.Column(
        db.String(100),
        unique=True,
        nullable=False,
    )

    name = db.Column(
        db.String(150),
        nullable=False,
    )

    description = db.Column(
        db.String(255),
        nullable=True,
    )

    roles = db.relationship(
    "Role",
    secondary=role_permissions,
    back_populates="permissions",
    lazy="selectin",
)

    def __repr__(self):
        return f"<Permission {self.code}>"