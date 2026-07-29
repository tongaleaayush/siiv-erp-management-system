from flask import request

from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
    get_jwt,
)

from flask_restx import Namespace, Resource, fields

from app.auth.schemas import (
    UserCreateSchema,
    UserLoginSchema,
    UserResponseSchema,
)

from app.auth.service import UserService

from app.auth.decorators import permission_required

from app.core.extensions import BLOCKLIST

from app.utils.response import (
    success_response,
)


auth_ns = Namespace(
    "auth",
    description="Authentication APIs",
)


# =====================================================
# Swagger Request Models
# =====================================================

register_model = auth_ns.model(
    "RegisterRequest",
    {
        "full_name": fields.String(
            required=True,
            description="User full name",
            example="Super Admin",
        ),
        "email": fields.String(
            required=True,
            description="User email address",
            example="admin@siiv.com",
        ),
        "password": fields.String(
            required=True,
            description="User password",
            example="Admin@123",
        ),
    },
)

login_model = auth_ns.model(
    "LoginRequest",
    {
        "email": fields.String(
            required=True,
            description="User email address",
            example="admin@siiv.com",
        ),
        "password": fields.String(
            required=True,
            description="User password",
            example="Admin@123",
        ),
    },
)


# =====================================================
# Schemas
# =====================================================

create_schema = UserCreateSchema()

login_schema = UserLoginSchema()

response_schema = UserResponseSchema()


# =====================================================
# Register API
# =====================================================

@auth_ns.route("/register")
class RegisterResource(Resource):

    @auth_ns.expect(
        register_model,
        validate=True,
    )
    def post(self):

        data = create_schema.load(
            request.get_json()
        )

        user = UserService.create_user(
            full_name=data["full_name"],
            email=data["email"],
            password=data["password"],
        )

        return success_response(
            message="User registered successfully.",
            data=response_schema.dump(user),
            status_code=201,
        )


# =====================================================
# Login API
# =====================================================

@auth_ns.route("/login")
class LoginResource(Resource):

    @auth_ns.expect(
        login_model,
        validate=True,
    )
    def post(self):

        data = login_schema.load(
            request.get_json()
        )

        auth_data = UserService.login_user(
            email=data["email"],
            password=data["password"],
        )

        return success_response(
            message="Login successful.",
            data={
                "user": response_schema.dump(
                    auth_data["user"]
                ),
                "access_token": auth_data["access_token"],
                "refresh_token": auth_data["refresh_token"],
            },
            status_code=200,
        )


# =====================================================
# Current User API
# =====================================================

@auth_ns.route("/me")
class CurrentUserResource(Resource):

    @jwt_required()
    def get(self):

        user_id = int(
            get_jwt_identity()
        )

        user = UserService.get_current_user(
            user_id
        )

        return success_response(
            message="User retrieved successfully.",
            data=response_schema.dump(user),
            status_code=200,
        )


# =====================================================
# Refresh Token API
# =====================================================

@auth_ns.route("/refresh")
class RefreshTokenResource(Resource):

    @jwt_required(refresh=True)
    def post(self):

        user_id = get_jwt_identity()

        new_access_token = create_access_token(
            identity=user_id
        )

        return success_response(
            message="Token refreshed successfully.",
            data={
                "access_token": new_access_token,
            },
            status_code=200,
        )


# =====================================================
# Permission Test API
# =====================================================

@auth_ns.route("/permission-test")
class PermissionTestResource(Resource):

    @permission_required(
        "this.permission.does.not.exist"
    )
    def get(self):

        return success_response(
            message="Permission check passed.",
            data=None,
            status_code=200,
        )


# =====================================================
# Logout API
# =====================================================

@auth_ns.route("/logout")
class LogoutResource(Resource):

    @jwt_required()
    def post(self):

        token = get_jwt()

        jti = token["jti"]

        BLOCKLIST.add(jti)

        return success_response(
            message="Logout successful.",
            data=None,
            status_code=200,
        )