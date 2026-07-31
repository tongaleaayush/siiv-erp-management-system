from marshmallow import Schema, fields


# =====================================================
# Create Inventory Transaction Schema
# =====================================================

class InventoryCreateSchema(Schema):

    product_id = fields.Integer(
        required=True
    )


    transaction_type = fields.String(
        required=True
    )


    quantity = fields.Decimal(
        required=True,
        as_string=True,
    )


    batch_number = fields.String(
        required=False,
        allow_none=True,
    )


    remarks = fields.String(
        required=False,
        allow_none=True,
    )


    transaction_date = fields.Date(
        required=False,
        allow_none=True,
    )



# =====================================================
# Inventory Response Schema
# =====================================================

class InventoryResponseSchema(Schema):

    id = fields.Integer()


    product_id = fields.Integer()


    transaction_type = fields.String()


    quantity = fields.Decimal(
        as_string=True
    )


    previous_stock = fields.Decimal(
        as_string=True
    )


    current_stock = fields.Decimal(
        as_string=True
    )


    batch_number = fields.String(
        allow_none=True
    )


    remarks = fields.String(
        allow_none=True
    )


    transaction_date = fields.Date()


    created_by = fields.Integer(
        allow_none=True
    )


    created_at = fields.DateTime()