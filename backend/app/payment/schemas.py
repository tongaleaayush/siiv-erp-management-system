from marshmallow import Schema, fields



class PaymentCreateSchema(Schema):

    invoice_id = fields.Integer(
        required=True
    )

    amount = fields.Decimal(
        required=True,
        as_string=True,
    )

    payment_method = fields.String(
        required=True
    )

    reference_number = fields.String(
        required=False,
        allow_none=True,
    )

    notes = fields.String(
        required=False,
        allow_none=True,
    )

class PaymentUpdateSchema(Schema):

    payment_date = fields.Date(
        required=False
    )

    payment_method = fields.String(
        required=False
    )

    reference_number = fields.String(
        required=False,
        allow_none=True,
    )

    notes = fields.String(
        required=False,
        allow_none=True,
    )    



class PaymentResponseSchema(Schema):

    id = fields.Integer()

    invoice_id = fields.Integer()

    payment_date = fields.Date()

    amount = fields.Decimal(
        as_string=True
    )

    payment_method = fields.String()

    reference_number = fields.String(
        allow_none=True
    )

    notes = fields.String(
        allow_none=True
    )

    created_at = fields.DateTime()