from marshmallow import Schema, fields, validate


# =====================================================
# Customer Create Schema
# =====================================================

class CustomerCreateSchema(Schema):

    name = fields.String(
        required=True,
        validate=validate.Length(
            min=2,
            max=255,
        ),
    )


    customer_type = fields.String(
        load_default="BUSINESS",
        validate=validate.OneOf(
            [
                "BUSINESS",
                "INDIVIDUAL",
            ]
        ),
    )


    email = fields.Email(
        required=True,
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


    address_line_1 = fields.String(
        allow_none=True,
        validate=validate.Length(
            max=255,
        ),
    )


    address_line_2 = fields.String(
        allow_none=True,
        validate=validate.Length(
            max=255,
        ),
    )


    city = fields.String(
        allow_none=True,
        validate=validate.Length(
            max=100,
        ),
    )


    state = fields.String(
        allow_none=True,
        validate=validate.Length(
            max=100,
        ),
    )


    country = fields.String(
        load_default="India",
        validate=validate.Length(
            max=100,
        ),
    )


    postal_code = fields.String(
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
# Customer Update Schema
# =====================================================

class CustomerUpdateSchema(Schema):

    name = fields.String(
        required=False,
        validate=validate.Length(
            min=2,
            max=255,
        ),
    )


    customer_type = fields.String(
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
        validate=validate.Length(
            max=255,
        ),
    )


    notes = fields.String(
        required=False,
        allow_none=True,
    )


    address_line_1 = fields.String(
        required=False,
        allow_none=True,
        validate=validate.Length(
            max=255,
        ),
    )


    address_line_2 = fields.String(
        required=False,
        allow_none=True,
        validate=validate.Length(
            max=255,
        ),
    )


    city = fields.String(
        required=False,
        allow_none=True,
        validate=validate.Length(
            max=100,
        ),
    )


    state = fields.String(
        required=False,
        allow_none=True,
        validate=validate.Length(
            max=100,
        ),
    )


    country = fields.String(
        required=False,
        validate=validate.Length(
            max=100,
        ),
    )


    postal_code = fields.String(
        required=False,
        allow_none=True,
        validate=validate.Length(
            max=20,
        ),
    )


    gst_number = fields.String(
        required=False,
        allow_none=True,
        validate=validate.Length(
            equal=15,
        ),
    )


    is_active = fields.Boolean(
        required=False,
    )



# =====================================================
# Customer Response Schema
# =====================================================

class CustomerResponseSchema(Schema):

    id = fields.Integer()

    customer_code = fields.String()

    name = fields.String()

    customer_type = fields.String()

    email = fields.Email()

    phone = fields.String()

    contact_person = fields.String(
        allow_none=True,
    )

    notes = fields.String(
        allow_none=True,
    )

    address_line_1 = fields.String(
        allow_none=True,
    )

    address_line_2 = fields.String(
        allow_none=True,
    )

    city = fields.String(
        allow_none=True,
    )

    state = fields.String(
        allow_none=True,
    )

    country = fields.String()

    postal_code = fields.String(
        allow_none=True,
    )

    gst_number = fields.String(
        allow_none=True,
    )

    is_active = fields.Boolean()

    created_at = fields.DateTime()

    updated_at = fields.DateTime()