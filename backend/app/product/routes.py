from flask import request

from flask_restx import Namespace, Resource

from marshmallow import ValidationError

from flask_jwt_extended import jwt_required

from app.auth.decorators import permission_required

from app.product.models import Product

from app.product.constants import PRODUCT_FILTER_FIELDS

from app.core.validation.query import QueryValidator

from app.product.schemas import (
    ProductCreateSchema,
    ProductUpdateSchema,
    ProductResponseSchema,
)

from app.product.service import ProductService

from app.utils.response import (
    success_response,
    error_response,
)


product_ns = Namespace(
    "products",
    description="Product management operations",
)


create_schema = ProductCreateSchema()

update_schema = ProductUpdateSchema()

response_schema = ProductResponseSchema()

response_schema_many = ProductResponseSchema(
    many=True
)


# =====================================================
# Product List
# =====================================================

@product_ns.route("")
class ProductListResource(Resource):

    @jwt_required()
    @permission_required("product.view")
    def get(self):

        search = request.args.get(
            "search"
        )

        sort_by = request.args.get(
            "sort_by"
        )

        sort_order = request.args.get(
            "sort_order",
            "asc"
        )

        page = request.args.get(
            "page",
            1,
            type=int
        )

        per_page = request.args.get(
            "per_page",
            10,
            type=int
        )

        try:

            QueryValidator.validate(
                page=page,
                per_page=per_page,
                sort_by=sort_by,
                sort_order=sort_order,
            )

        except ValueError as error:

            return error_response(
                message=str(error),
                status_code=400,
            )

        filters = {}

        ignored_fields = {
            "search",
            "sort_by",
            "sort_order",
            "page",
            "per_page",
        }

        for key, value in request.args.items():

            if key in ignored_fields:
                continue

            if "__" in key:

                field_name, operator = key.split(
                    "__",
                    1
                )

            else:

                field_name = key
                operator = "eq"

            if field_name not in PRODUCT_FILTER_FIELDS:
                continue

            column = getattr(
                Product,
                field_name,
                None
            )

            if column:

                filters[
                    (
                        column,
                        operator
                    )
                ] = value

        products, total_records = (
            ProductService.list_products(

                search=search,

                filters=filters,

                page=page,

                per_page=per_page,

                sort_by=sort_by,

                sort_order=sort_order,

            )
        )

        total_pages = (

            (total_records + per_page - 1)
            //
            per_page

            if per_page > 0

            else 0

        )

        return success_response(

            message="Products fetched successfully.",

            data=response_schema_many.dump(
                products
            ),

            meta={

                "page": page,

                "per_page": per_page,

                "total_records": total_records,

                "total_pages": total_pages,

                "has_next": page < total_pages,

                "has_previous": page > 1,

            },

            status_code=200,

        )

    # =================================================
    # CREATE PRODUCT
    # Permission: product.create
    # =================================================

    @jwt_required()
    @permission_required("product.create")
    def post(self):

        try:

            data = create_schema.load(
                request.get_json()
            )

            product = Product(
                **data
            )

            product = (
                ProductService.create_product(
                    product
                )
            )

            return success_response(

                message="Product created successfully.",

                data=response_schema.dump(
                    product
                ),

                status_code=201,

            )

        except ValidationError as error:

            return error_response(

                message="Validation failed.",

                errors=error.messages,

                status_code=400,

            )


# =====================================================
# Single Product
# =====================================================

@product_ns.route(
    "/<int:product_id>"
)
class ProductResource(Resource):

    @jwt_required()
    @permission_required("product.view")
    def get(
        self,
        product_id
    ):

        product = (
            ProductService.get_product_by_id(
                product_id
            )
        )

        return success_response(

            message="Product fetched successfully.",

            data=response_schema.dump(
                product
            ),

            status_code=200,

        )

    # =================================================
    # UPDATE PRODUCT
    # Permission: product.update
    # =================================================

    @jwt_required()
    @permission_required("product.update")
    def put(
        self,
        product_id
    ):

        try:

            data = update_schema.load(
                request.get_json()
            )

            product = (
                ProductService.update_product(
                    product_id,
                    data
                )
            )

            return success_response(

                message="Product updated successfully.",

                data=response_schema.dump(
                    product
                ),

                status_code=200,

            )

        except ValidationError as error:

            return error_response(

                message="Validation failed.",

                errors=error.messages,

                status_code=400,

            )

    # =================================================
    # DELETE PRODUCT (Soft Delete)
    # Permission: product.delete
    # =================================================

    @jwt_required()
    @permission_required("product.delete")
    def delete(
        self,
        product_id
    ):

        ProductService.delete_product(
            product_id
        )

        return success_response(

            message="Product deleted successfully.",

            status_code=200,

        )


# =====================================================
# Restore Product
# Permission: product.update
# =====================================================

@product_ns.route(
    "/<int:product_id>/restore"
)
class ProductRestoreResource(Resource):

    @jwt_required()
    @permission_required("product.update")
    def post(
        self,
        product_id
    ):

        product = (
            ProductService.restore_product(
                product_id
            )
        )

        return success_response(

            message="Product restored successfully.",

            data=response_schema.dump(
                product
            ),

            status_code=200,

        )