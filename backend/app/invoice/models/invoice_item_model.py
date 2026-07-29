from app.core.database.base_model import BaseModel
from app.core.extensions import db


class InvoiceItem(BaseModel):
    __tablename__ = "invoice_items"

    invoice_id = db.Column(
        db.Integer,
        db.ForeignKey("invoices.id"),
        nullable=False,
        index=True,
    )

    product_id = db.Column(
        db.Integer,
        db.ForeignKey("products.id"),
        nullable=False,
        index=True,
    )

    quantity = db.Column(
        db.Numeric(12, 2),
        nullable=False,
    )

    unit_price = db.Column(
        db.Numeric(12, 2),
        nullable=False,
    )

    gst_percentage = db.Column(
        db.Numeric(5, 2),
        nullable=False,
    )

    taxable_amount = db.Column(
        db.Numeric(12, 2),
        nullable=False,
    )

    gst_amount = db.Column(
        db.Numeric(12, 2),
        nullable=False,
    )

    total_amount = db.Column(
        db.Numeric(12, 2),
        nullable=False,
    )

    product = db.relationship(
      "Product",
       backref="invoice_items",
       lazy=True,
    )