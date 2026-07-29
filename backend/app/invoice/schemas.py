from marshmallow import Schema, fields, validate


# =====================================================
# Invoice Item Create Schema
# =====================================================

class InvoiceItemCreateSchema(Schema):

    product_id = fields.Integer(
        required=True,
    )

    quantity = fields.Float(
        required=True,
        validate=validate.Range(
            min=0.01,
        ),
    )


# =====================================================
# Invoice Create Schema
# =====================================================

class InvoiceCreateSchema(Schema):

    customer_id = fields.Integer(
        required=True,
    )

    invoice_date = fields.Date(
        required=True,
    )

    due_date = fields.Date(
        allow_none=True,
    )

    status = fields.String(
        load_default="DRAFT",
    )

    notes = fields.String(
        allow_none=True,
    )

    items = fields.List(

        fields.Nested(
            InvoiceItemCreateSchema
        ),

        required=True,

        validate=validate.Length(
            min=1,
        ),

    )

# =====================================================
# Invoice Update Schema
# =====================================================

class InvoiceUpdateSchema(Schema):

    customer_id = fields.Integer(
        required=False,
    )

    invoice_date = fields.Date(
        required=False,
    )

    due_date = fields.Date(
        allow_none=True,
    )

    status = fields.String(
        required=False,
    )

    notes = fields.String(
        allow_none=True,
    )

    items = fields.List(

        fields.Nested(
            InvoiceItemCreateSchema
        ),

        required=False,

    )


# =====================================================
# Invoice Item Response Schema
# =====================================================

class InvoiceItemResponseSchema(Schema):

    id = fields.Integer()

    product_id = fields.Integer()

    quantity = fields.Float()

    unit_price = fields.Decimal(
        as_string=True,
    )

    gst_percentage = fields.Decimal(
        as_string=True,
    )

    taxable_amount = fields.Decimal(
        as_string=True,
    )

    gst_amount = fields.Decimal(
        as_string=True,
    )

    total_amount = fields.Decimal(
        as_string=True,
    )


# =====================================================
# Invoice Response Schema
# =====================================================

class InvoiceResponseSchema(Schema):

    id = fields.Integer()

    invoice_number = fields.String()

    customer_id = fields.Integer()

    invoice_date = fields.Date()

    due_date = fields.Date(
        allow_none=True,
    )

    subtotal = fields.Decimal(
        as_string=True,
    )

    cgst_amount = fields.Decimal(
        as_string=True,
    )

    sgst_amount = fields.Decimal(
        as_string=True,
    )

    igst_amount = fields.Decimal(
        as_string=True,
    )

    total_tax = fields.Decimal(
        as_string=True,
    )

    grand_total = fields.Decimal(
        as_string=True,
    )

    status = fields.String()

    notes = fields.String(
        allow_none=True,
    )

    created_at = fields.DateTime()

    updated_at = fields.DateTime()

    items = fields.Nested(
        InvoiceItemResponseSchema,
        many=True,
    )