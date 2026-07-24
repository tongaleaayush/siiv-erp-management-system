from flask import request

from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,
)
from flask_restx import Namespace, Resource, fields

from app.auth.decorators import permission_required
from app.auth.schemas import (
    UserCreateSchema,
    UserLoginSchema,
    UserResponseSchema,
)
from app.auth.service import UserService
from app.utils.response import success_response

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
            description="User's full name",
            example="Super Admin",
        ),
        "email": fields.String(
            required=True,
            description="User's email address",
            example="admin@siiv.com",
        ),
        "password": fields.String(
            required=True,
            description="User's password",
            example="Admin@123",
        ),
    },
)

login_model = auth_ns.model(
    "LoginRequest",
    {
        "email": fields.String(
            required=True,
            description="User's email address",
            example="admin@siiv.com",
        ),
        "password": fields.String(
            required=True,
            description="User's password",
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

    @auth_ns.expect(register_model, validate=True)
    @auth_ns.doc(
        description="Register a new user.",
        responses={
            201: "User registered successfully.",
            400: "Validation error.",
            409: "Email already exists.",
        },
    )
    def post(self):
        """
        Register a new user.
        """

        data = create_schema.load(request.get_json())

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

    @auth_ns.expect(login_model, validate=True)
    @auth_ns.doc(
        description="Authenticate a user.",
        responses={
            200: "Login successful.",
            401: "Invalid email or password.",
        },
    )
    def post(self):
        """
        Authenticate a user.
        """

        data = login_schema.load(request.get_json())

        auth_data = UserService.login_user(
            email=data["email"],
            password=data["password"],
        )

        return success_response(
            message="Login successful.",
            data={
                "user": response_schema.dump(auth_data["user"]),
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
    @auth_ns.doc(
        description="Get the currently authenticated user.",
        security="Bearer",
        responses={
            200: "User retrieved successfully.",
            401: "Unauthorized.",
            404: "User not found.",
        },
    )
    def get(self):
        """
        Get the currently authenticated user.
        """

        user_id = int(get_jwt_identity())

        user = UserService.get_current_user(user_id)

        return success_response(
            message="User retrieved successfully.",
            data=response_schema.dump(user),
            status_code=200,
        )


# =====================================================
# Permission Test API
# =====================================================

@auth_ns.route("/permission-test")
class PermissionTestResource(Resource):

    @permission_required("this.permission.does.not.exist")
    @auth_ns.doc(
        description="Test RBAC permission checking.",
        security="Bearer",
    )
    def get(self):
        """
        Permission test endpoint.
        """

        return success_response(
            message="Permission check passed.",
            data=None,
            status_code=200,
        )