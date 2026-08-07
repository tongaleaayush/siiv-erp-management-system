from app.core.database.base_model import BaseModel
from app.core.extensions import db


class InventoryTransaction(BaseModel):

    __tablename__ = "inventory_transactions"


    product_id = db.Column(
        db.Integer,
        db.ForeignKey("products.id"),
        nullable=False,
        index=True,
    )


    transaction_type = db.Column(
        db.String(10),
        nullable=False,
        index=True,
    )


    quantity = db.Column(
        db.Numeric(12,2),
        nullable=False,
    )

    previous_stock = db.Column(
        db.Numeric(12,2),
        nullable=False,
        default=0,
    )


    current_stock = db.Column(
        db.Numeric(12,2),
        nullable=False,
        default=0,
    )


    batch_number = db.Column(
        db.String(50),
        nullable=True,
    )


    remarks = db.Column(
        db.Text,
        nullable=True,
    )


    transaction_date = db.Column(
        db.Date,
        nullable=False,
    )


    created_by = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=True,
    )


    

    