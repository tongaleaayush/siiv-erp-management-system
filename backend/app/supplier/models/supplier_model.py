from app.core.database.base_model import BaseModel
from app.core.extensions import db


class Supplier(BaseModel):

    __tablename__ = "suppliers"


    supplier_code = db.Column(
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


    supplier_type = db.Column(
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


    # ==============================
    # Billing Address
    # ==============================

    billing_address_line_1 = db.Column(
        db.String(255),
        nullable=True,
    )


    billing_address_line_2 = db.Column(
        db.String(255),
        nullable=True,
    )


    billing_city = db.Column(
        db.String(100),
        nullable=True,
        index=True,
    )


    billing_state = db.Column(
        db.String(100),
        nullable=True,
        index=True,
    )


    billing_country = db.Column(
        db.String(100),
        nullable=False,
        default="India",
    )


    billing_postal_code = db.Column(
        db.String(20),
        nullable=True,
    )


    # ==============================
    # Shipping Address
    # ==============================

    shipping_address_line_1 = db.Column(
        db.String(255),
        nullable=True,
    )


    shipping_address_line_2 = db.Column(
        db.String(255),
        nullable=True,
    )


    shipping_city = db.Column(
        db.String(100),
        nullable=True,
        index=True,
    )


    shipping_state = db.Column(
        db.String(100),
        nullable=True,
        index=True,
    )


    shipping_country = db.Column(
        db.String(100),
        nullable=False,
        default="India",
    )


    shipping_postal_code = db.Column(
        db.String(20),
        nullable=True,
    )


    gst_number = db.Column(
        db.String(15),
        unique=True,
        nullable=True,
        index=True,
    )


    is_active = db.Column(
        db.Boolean,
        nullable=False,
        default=True,
        index=True,
    )


    # ==============================
    # Soft Delete
    # ==============================

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