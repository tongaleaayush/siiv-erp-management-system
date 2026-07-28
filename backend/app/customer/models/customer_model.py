from app.core.database.base_model import BaseModel
from app.core.extensions import db


class Customer(BaseModel):
    __tablename__ = "customers"

    customer_code = db.Column(
        db.String(20),
        unique=True,
        nullable=False,
        index=True,
    )

    name = db.Column(
        db.String(255),
        nullable=False,
        index=True,
    )

    customer_type = db.Column(
        db.String(20),
        nullable=False,
        default="BUSINESS",
    )

    email = db.Column(
        db.String(255),
        unique=True,
        nullable=True,
        index=True,
    )

    phone = db.Column(
        db.String(20),
        nullable=False,
        index=True,
    )

    contact_person = db.Column(
        db.String(255),
        nullable=True,
    )

    notes = db.Column(
        db.Text,
        nullable=True,
    )

    address_line_1 = db.Column(
        db.String(255),
        nullable=True,
    )

    address_line_2 = db.Column(
        db.String(255),
        nullable=True,
    )

    city = db.Column(
        db.String(100),
        nullable=True,
        index=True,
    )

    state = db.Column(
        db.String(100),
        nullable=True,
        index=True,
    )

    country = db.Column(
        db.String(100),
        nullable=False,
        default="India",
        index=True,
    )

    postal_code = db.Column(
        db.String(20),
        nullable=True,
        index=True,
    )

    gst_number = db.Column(
        db.String(15),
        unique=True,
        nullable=True,
        index=True,
    )

    # Soft Delete Fields
    is_deleted = db.Column(
        db.Boolean,
        nullable=False,
        default=False,
        index=True,
    )

    deleted_by = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=True,
    )

    deleted_at = db.Column(
        db.DateTime(timezone=True),
        nullable=True,
    )