from flask import request

from marshmallow import ValidationError

from flask_restx import (
    Namespace,
    Resource,
)

from flask_jwt_extended import jwt_required

from app.auth.decorators import permission_required

from app.invoice.schemas import (
    InvoiceCreateSchema,
    InvoiceUpdateSchema,
    InvoiceResponseSchema,
)

from app.invoice.service import (
    InvoiceService,
)

from app.utils.response import (
    success_response,
    error_response,
)


invoice_ns = Namespace(
    "invoices",
    description="Invoice management operations",
)


create_schema = InvoiceCreateSchema()

update_schema = InvoiceUpdateSchema()

response_schema = InvoiceResponseSchema()


# =====================================================
# Invoice List & Create
# =====================================================

@invoice_ns.route("")
class InvoiceListResource(Resource):

    @jwt_required()
    @permission_required("invoice.view")
    def get(self):

        search = request.args.get(
            "search"
        )

        sort_by = request.args.get(
            "sort_by"
        )

        sort_order = request.args.get(
            "sort_order",
            "asc",
        )

        page = request.args.get(
            "page",
            1,
            type=int,
        )

        per_page = request.args.get(
            "per_page",
            10,
            type=int,
        )

        invoices, total_records = InvoiceService.get_all_invoices(

            search=search,

            page=page,

            per_page=per_page,

            sort_by=sort_by,

            sort_order=sort_order,

        )

        total_pages = (

            (total_records + per_page - 1)
            //
            per_page

            if per_page > 0

            else 0

        )

        return success_response(

            message="Invoices fetched successfully.",

            data=response_schema.dump(
                invoices,
                many=True,
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

    @jwt_required()
    @permission_required("invoice.create")
    def post(self):

        try:

            data = create_schema.load(
                request.get_json()
            )

            invoice = InvoiceService.create_invoice(
                data
            )

            return success_response(

                message="Invoice created successfully.",

                data=response_schema.dump(
                    invoice
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
# Single Invoice
# =====================================================

@invoice_ns.route(
    "/<int:invoice_id>"
)
class InvoiceResource(Resource):

    @jwt_required()
    @permission_required("invoice.view")
    def get(
        self,
        invoice_id,
    ):

        invoice = InvoiceService.get_invoice_by_id(
            invoice_id
        )

        return success_response(

            message="Invoice fetched successfully.",

            data=response_schema.dump(
                invoice
            ),

            status_code=200,

        )

    @jwt_required()
    @permission_required("invoice.delete")
    def put(
        self,
        invoice_id,
    ):

        try:

            data = update_schema.load(
                request.get_json()
            )

            invoice = InvoiceService.update_invoice(
                invoice_id,
                data,
            )

            return success_response(

                message="Invoice updated successfully.",

                data=response_schema.dump(
                    invoice
                ),

                status_code=200,

            )

        except ValidationError as error:

            return error_response(

                message="Validation failed.",

                errors=error.messages,

                status_code=400,

            )

    @jwt_required()
    @permission_required("invoice.delete")
    def delete(
        self,
        invoice_id,
    ):

        InvoiceService.delete_invoice(
            invoice_id,
            deleted_by=2,
        )

        return success_response(

            message="Invoice deleted successfully.",

            status_code=200,

        )


# =====================================================
# Restore Invoice
# =====================================================

@invoice_ns.route(
    "/<int:invoice_id>/restore"
)
class InvoiceRestoreResource(Resource):

    @jwt_required()
    @permission_required("invoice.delete")
    def put(
        self,
        invoice_id,
    ):

        invoice = InvoiceService.restore_invoice(
            invoice_id
        )

        return success_response(

            message="Invoice restored successfully.",

            data=response_schema.dump(
                invoice
            ),

            status_code=200,

        )