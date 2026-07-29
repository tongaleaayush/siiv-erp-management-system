from marshmallow import Schema, fields, validate


# =====================================================
# Product Create Schema
# =====================================================

class ProductCreateSchema(Schema):

    name = fields.String(
        required=True,
        validate=validate.Length(
            min=2,
            max=255,
        ),
    )

    description = fields.String(
        allow_none=True,
    )

    hsn_code = fields.String(
        allow_none=True,
        validate=validate.Length(
            max=20,
        ),
    )

    unit = fields.String(
        required=True,
        validate=validate.Length(
            min=1,
            max=20,
        ),
    )

    purchase_price = fields.Decimal(
        required=True,
        places=2,
        as_string=True,
    )

    selling_price = fields.Decimal(
        required=True,
        places=2,
        as_string=True,
    )

    gst_percentage = fields.Decimal(
        required=True,
        places=2,
        as_string=True,
    )

    is_active = fields.Boolean(
        load_default=True,
    )


# =====================================================
# Product Update Schema
# =====================================================

class ProductUpdateSchema(Schema):

    name = fields.String(
        required=False,
        validate=validate.Length(
            min=2,
            max=255,
        ),
    )

    description = fields.String(
        required=False,
        allow_none=True,
    )

    hsn_code = fields.String(
        required=False,
        allow_none=True,
        validate=validate.Length(
            max=20,
        ),
    )

    unit = fields.String(
        required=False,
        validate=validate.Length(
            min=1,
            max=20,
        ),
    )

    purchase_price = fields.Decimal(
        required=False,
        places=2,
        as_string=True,
    )

    selling_price = fields.Decimal(
        required=False,
        places=2,
        as_string=True,
    )

    gst_percentage = fields.Decimal(
        required=False,
        places=2,
        as_string=True,
    )

    is_active = fields.Boolean(
        required=False,
    )


# =====================================================
# Product Response Schema
# =====================================================

class ProductResponseSchema(Schema):

    id = fields.Integer()

    product_code = fields.String()

    name = fields.String()

    description = fields.String(
        allow_none=True,
    )

    hsn_code = fields.String(
        allow_none=True,
    )

    unit = fields.String()

    purchase_price = fields.Decimal(
        places=2,
        as_string=True,
    )

    selling_price = fields.Decimal(
        places=2,
        as_string=True,
    )

    gst_percentage = fields.Decimal(
        places=2,
        as_string=True,
    )

    is_active = fields.Boolean()

    created_at = fields.DateTime()

    updated_at = fields.DateTime()