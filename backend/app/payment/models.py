from app.core.database.base_model import BaseModel
from app.core.extensions import db


class Payment(BaseModel):
    __tablename__ = "payments"

    invoice_id = db.Column(
        db.Integer,
        db.ForeignKey("invoices.id"),
        nullable=False,
        index=True,
    )

    payment_date = db.Column(
        db.Date,
        nullable=False,
    )

    amount = db.Column(
        db.Numeric(12, 2),
        nullable=False,
    )

    payment_method = db.Column(
        db.String(50),
        nullable=False,
    )

    reference_number = db.Column(
        db.String(100),
        nullable=True,
    )

    notes = db.Column(
        db.Text,
        nullable=True,
    )

    invoice = db.relationship(
        "Invoice",
        backref="payments",
        lazy=True,
    )