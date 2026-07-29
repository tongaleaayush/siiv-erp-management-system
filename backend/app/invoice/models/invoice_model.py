from app.core.database.base_model import BaseModel
from app.core.extensions import db


class Invoice(BaseModel):
    __tablename__ = "invoices"

    invoice_number = db.Column(
        db.String(20),
        unique=True,
        nullable=False,
        index=True,
    )

    customer_id = db.Column(
        db.Integer,
        db.ForeignKey("customers.id"),
        nullable=False,
        index=True,
    )

    invoice_date = db.Column(
        db.Date,
        nullable=False,
    )

    due_date = db.Column(
        db.Date,
        nullable=True,
    )

    subtotal = db.Column(
        db.Numeric(12, 2),
        nullable=False,
        default=0,
    )

    cgst_amount = db.Column(
        db.Numeric(12, 2),
        nullable=False,
        default=0,
    )

    sgst_amount = db.Column(
        db.Numeric(12, 2),
        nullable=False,
        default=0,
    )

    igst_amount = db.Column(
        db.Numeric(12, 2),
        nullable=False,
        default=0,
    )

    total_tax = db.Column(
        db.Numeric(12, 2),
        nullable=False,
        default=0,
    )

    grand_total = db.Column(
        db.Numeric(12, 2),
        nullable=False,
        default=0,
    )

    paid_amount = db.Column(
        db.Numeric(12, 2),
        nullable=False,
        default=0,
    )

    due_amount = db.Column(
        db.Numeric(12, 2),
        nullable=False,
        default=0,
    )

    payment_status = db.Column(
        db.String(30),
        nullable=False,
        default="UNPAID",
    )

    status = db.Column(
        db.String(20),
        nullable=False,
        default="DRAFT",
        index=True,
    )

    notes = db.Column(
        db.Text,
        nullable=True,
    )

    # =====================================================
    # Soft Delete
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

    customer = db.relationship(
        "Customer",
        backref="invoices",
        lazy=True,
    )

    items = db.relationship(
        "InvoiceItem",
        backref="invoice",
        cascade="all, delete-orphan",
        lazy=True,
    )