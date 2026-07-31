from flask import request

from flask_restx import Namespace, Resource

from marshmallow import ValidationError

from flask_jwt_extended import jwt_required

from app.auth.decorators import permission_required

from app.supplier.models import Supplier

from app.supplier.constants import SUPPLIER_FILTER_FIELDS

from app.core.validation.query import QueryValidator

from app.supplier.schemas import (
    SupplierCreateSchema,
    SupplierUpdateSchema,
    SupplierResponseSchema,
)

from app.supplier.service import SupplierService

from app.utils.response import (
    success_response,
    error_response,
)


supplier_ns = Namespace(
    "suppliers",
    description="Supplier management operations",
)


create_schema = SupplierCreateSchema()

update_schema = SupplierUpdateSchema()

response_schema = SupplierResponseSchema()

response_schema_many = SupplierResponseSchema(
    many=True
)



# =====================================================
# Supplier List
# =====================================================

@supplier_ns.route("")
class SupplierListResource(Resource):


    @jwt_required()
    @permission_required("supplier.view")
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



            if field_name not in SUPPLIER_FILTER_FIELDS:
                continue



            column = getattr(
                Supplier,
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



        suppliers, total_records = (
            SupplierService.list_suppliers(

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

            message="Suppliers fetched successfully.",


            data=response_schema_many.dump(
                suppliers
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



    # =====================================================
    # Create Supplier
    # =====================================================

    @jwt_required()
    @permission_required("supplier.create")
    def post(self):

        try:

            data = create_schema.load(
                request.get_json()
            )


            supplier = Supplier(
                **data
            )


            supplier = (
                SupplierService.create_supplier(
                    supplier
                )
            )


            return success_response(

                message="Supplier created successfully.",

                data=response_schema.dump(
                    supplier
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
# Single Supplier
# =====================================================

@supplier_ns.route(
    "/<int:supplier_id>"
)
class SupplierResource(Resource):


    @jwt_required()
    @permission_required("supplier.view")
    def get(
        self,
        supplier_id
    ):


        supplier = (
            SupplierService.get_supplier_by_id(
                supplier_id
            )
        )


        return success_response(

            message="Supplier fetched successfully.",

            data=response_schema.dump(
                supplier
            ),

            status_code=200,

        )



    # =====================================================
    # Update Supplier
    # =====================================================

    @jwt_required()
    @permission_required("supplier.update")
    def put(
        self,
        supplier_id
    ):


        try:

            data = update_schema.load(
                request.get_json()
            )


            supplier = (
                SupplierService.update_supplier(
                    supplier_id,
                    data
                )
            )


            return success_response(

                message="Supplier updated successfully.",

                data=response_schema.dump(
                    supplier
                ),

                status_code=200,

            )


        except ValidationError as error:


            return error_response(

                message="Validation failed.",

                errors=error.messages,

                status_code=400,

            )



    # =====================================================
    # Delete Supplier
    # =====================================================

    @jwt_required()
    @permission_required("supplier.delete")
    def delete(
        self,
        supplier_id
    ):


        SupplierService.delete_supplier(
            supplier_id
        )


        return success_response(

            message="Supplier deleted successfully.",

            status_code=200,

        )




# =====================================================
# Restore Supplier
# =====================================================

@supplier_ns.route(
    "/<int:supplier_id>/restore"
)
class SupplierRestoreResource(Resource):


    @jwt_required()
    @permission_required("supplier.update")
    def post(
        self,
        supplier_id
    ):


        supplier = (
            SupplierService.restore_supplier(
                supplier_id
            )
        )


        return success_response(

            message="Supplier restored successfully.",

            data=response_schema.dump(
                supplier
            ),

            status_code=200,

        )