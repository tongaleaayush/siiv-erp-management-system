from marshmallow import Schema, fields


class UserCreateSchema(Schema):

    full_name = fields.String(
        required=True
    )

    email = fields.Email(
        required=True
    )

    password = fields.String(
        required=True,
        load_only=True,
    )


class UserLoginSchema(Schema):

    email = fields.Email(
        required=True
    )

    password = fields.String(
        required=True,
        load_only=True,
    )


class UserResponseSchema(Schema):

    id = fields.Integer()

    full_name = fields.String()

    email = fields.Email()

    is_active = fields.Boolean()

    created_at = fields.DateTime()

    updated_at = fields.DateTime()