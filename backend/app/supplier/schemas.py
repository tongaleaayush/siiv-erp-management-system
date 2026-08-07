from marshmallow import Schema, fields, validate


# =====================================================
# Supplier Create Schema
# =====================================================

class SupplierCreateSchema(Schema):

    name = fields.String(
        required=True,
        validate=validate.Length(
            min=2,
            max=255,
        ),
    )


    supplier_type = fields.String(
        load_default="BUSINESS",
        validate=validate.OneOf(
            [
                "BUSINESS",
                "INDIVIDUAL",
            ]
        ),
    )


    email = fields.Email(
        allow_none=True,
    )


    phone = fields.String(
        required=True,
        validate=validate.Length(
            min=10,
            max=20,
        ),
    )


    contact_person = fields.String(
        allow_none=True,
        validate=validate.Length(
            max=255,
        ),
    )


    notes = fields.String(
        allow_none=True,
    )


    # ==============================
    # Billing Address
    # ==============================

    billing_address_line_1 = fields.String(
        allow_none=True,
        validate=validate.Length(
            max=255,
        ),
    )


    billing_address_line_2 = fields.String(
        allow_none=True,
        validate=validate.Length(
            max=255,
        ),
    )


    billing_city = fields.String(
        allow_none=True,
        validate=validate.Length(
            max=100,
        ),
    )


    billing_state = fields.String(
        allow_none=True,
        validate=validate.Length(
            max=100,
        ),
    )


    billing_country = fields.String(
        load_default="India",
        validate=validate.Length(
            max=100,
        ),
    )


    billing_postal_code = fields.String(
        allow_none=True,
        validate=validate.Length(
            max=20,
        ),
    )


    # ==============================
    # Shipping Address
    # ==============================

    shipping_address_line_1 = fields.String(
        allow_none=True,
        validate=validate.Length(
            max=255,
        ),
    )


    shipping_address_line_2 = fields.String(
        allow_none=True,
        validate=validate.Length(
            max=255,
        ),
    )


    shipping_city = fields.String(
        allow_none=True,
        validate=validate.Length(
            max=100,
        ),
    )


    shipping_state = fields.String(
        allow_none=True,
        validate=validate.Length(
            max=100,
        ),
    )


    shipping_country = fields.String(
        load_default="India",
        validate=validate.Length(
            max=100,
        ),
    )


    shipping_postal_code = fields.String(
        allow_none=True,
        validate=validate.Length(
            max=20,
        ),
    )


    gst_number = fields.String(
        allow_none=True,
        validate=validate.Length(
            equal=15,
        ),
    )


    is_active = fields.Boolean(
        load_default=True,
    )



# =====================================================
# Supplier Update Schema
# =====================================================

class SupplierUpdateSchema(Schema):

    name = fields.String(
        required=False,
        validate=validate.Length(
            min=2,
            max=255,
        ),
    )


    supplier_type = fields.String(
        required=False,
        validate=validate.OneOf(
            [
                "BUSINESS",
                "INDIVIDUAL",
            ]
        ),
    )


    email = fields.Email(
        required=False,
        allow_none=True,
    )


    phone = fields.String(
        required=False,
        validate=validate.Length(
            min=10,
            max=20,
        ),
    )


    contact_person = fields.String(
        required=False,
        allow_none=True,
    )


    notes = fields.String(
        required=False,
        allow_none=True,
    )


    billing_address_line_1 = fields.String(
        required=False,
        allow_none=True,
    )


    billing_address_line_2 = fields.String(
        required=False,
        allow_none=True,
    )


    billing_city = fields.String(
        required=False,
        allow_none=True,
    )


    billing_state = fields.String(
        required=False,
        allow_none=True,
    )


    billing_country = fields.String(
        required=False,
    )


    billing_postal_code = fields.String(
        required=False,
        allow_none=True,
    )


    shipping_address_line_1 = fields.String(
        required=False,
        allow_none=True,
    )


    shipping_address_line_2 = fields.String(
        required=False,
        allow_none=True,
    )


    shipping_city = fields.String(
        required=False,
        allow_none=True,
    )


    shipping_state = fields.String(
        required=False,
        allow_none=True,
    )


    shipping_country = fields.String(
        required=False,
    )


    shipping_postal_code = fields.String(
        required=False,
        allow_none=True,
    )


    gst_number = fields.String(
        required=False,
        allow_none=True,
    )


    is_active = fields.Boolean(
        required=False,
    )



# =====================================================
# Supplier Response Schema
# =====================================================

class SupplierResponseSchema(Schema):

    id = fields.Integer()

    supplier_code = fields.String()

    name = fields.String()

    supplier_type = fields.String()

    email = fields.Email(
        allow_none=True,
    )

    phone = fields.String()

    contact_person = fields.String(
        allow_none=True,
    )

    notes = fields.String(
        allow_none=True,
    )


    billing_address_line_1 = fields.String(
        allow_none=True,
    )

    billing_address_line_2 = fields.String(
        allow_none=True,
    )

    billing_city = fields.String(
        allow_none=True,
    )

    billing_state = fields.String(
        allow_none=True,
    )

    billing_country = fields.String()

    billing_postal_code = fields.String(
        allow_none=True,
    )


    shipping_address_line_1 = fields.String(
        allow_none=True,
    )

    shipping_address_line_2 = fields.String(
        allow_none=True,
    )

    shipping_city = fields.String(
        allow_none=True,
    )

    shipping_state = fields.String(
        allow_none=True,
    )

    shipping_country = fields.String()

    shipping_postal_code = fields.String(
        allow_none=True,
    )


    gst_number = fields.String(
        allow_none=True,
    )


    is_active = fields.Boolean()


    created_at = fields.DateTime()

    updated_at = fields.DateTime()