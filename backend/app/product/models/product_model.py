from app.core.database.base_model import BaseModel
from app.core.extensions import db


class Product(BaseModel):
    __tablename__ = "products"

    product_code = db.Column(
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

    description = db.Column(
        db.Text,
        nullable=True,
    )

    hsn_code = db.Column(
        db.String(20),
        nullable=True,
        index=True,
    )

    unit = db.Column(
        db.String(20),
        nullable=False,
        index=True,
    )

    purchase_price = db.Column(
        db.Numeric(12, 2),
        nullable=False,
        default=0,
    )

    selling_price = db.Column(
        db.Numeric(12, 2),
        nullable=False,
        default=0,
    )

    gst_percentage = db.Column(
        db.Numeric(5, 2),
        nullable=False,
        default=18,
    )

    stock_quantity = db.Column(
        db.Numeric(12, 2),
        nullable=False,
        default=0,
    )

    is_active = db.Column(
        db.Boolean,
        nullable=False,
        default=True,
        index=True,
    )

    # =====================================================
    # Soft Delete Fields
    # =====================================================

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