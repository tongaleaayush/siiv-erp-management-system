from flask import request

from flask_restx import Namespace, Resource, fields

from flask_jwt_extended import jwt_required

from marshmallow import ValidationError

from app.auth.decorators import permission_required

from app.payment.schemas import (
    PaymentCreateSchema,
    PaymentUpdateSchema,
    PaymentResponseSchema,
)

from app.payment.service import PaymentService

from app.utils.response import (
    success_response,
    error_response,
)


payment_ns = Namespace(
    "payments",
    description="Payment management operations",
)


# =====================================================
# Swagger Model
# =====================================================

payment_model = payment_ns.model(
    "Payment",
    {
        "invoice_id": fields.Integer(
            required=True,
            description="Invoice ID",
        ),

        "amount": fields.Float(
            required=True,
            description="Payment amount",
        ),

        "payment_method": fields.String(
            required=True,
            description="Payment method (CASH, UPI, BANK)",
        ),

        "reference_number": fields.String(
            required=False,
            description="Transaction reference number",
        ),

        "notes": fields.String(
            required=False,
            description="Additional notes",
        ),
    }
)


# =====================================================
# Schemas
# =====================================================

create_schema = PaymentCreateSchema()

update_schema = PaymentUpdateSchema()

response_schema = PaymentResponseSchema()

response_schema_many = PaymentResponseSchema(
    many=True
)



# =====================================================
# Payment List
# GET All Payments
# POST Create Payment
# =====================================================

@payment_ns.route("")
class PaymentListResource(Resource):


    # =================================================
    # Get All Payments
    # Permission: payment.view
    # =================================================

    @jwt_required()
    @permission_required("payment.view")
    def get(self):

        payments = PaymentService.get_all_payments()


        return success_response(

            message="Payments fetched successfully.",

            data=response_schema_many.dump(
                payments
            ),

            status_code=200,

        )



    # =================================================
    # Create Payment
    # Permission: payment.create
    # =================================================

    @jwt_required()
    @permission_required("payment.create")
    @payment_ns.expect(payment_model)
    def post(self):

        try:

            data = create_schema.load(
                request.get_json()
            )


            payment = PaymentService.create_payment(
                data
            )


            return success_response(

                message="Payment created successfully.",

                data=response_schema.dump(
                    payment
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
# Payment Details
# GET By ID
# PUT Update
# DELETE Delete
# =====================================================

@payment_ns.route("/<int:payment_id>")
class PaymentDetailResource(Resource):


    # =================================================
    # Get Payment By ID
    # Permission: payment.view
    # =================================================

    @jwt_required()
    @permission_required("payment.view")
    def get(
        self,
        payment_id
    ):

        payment = PaymentService.get_payment_by_id(
            payment_id
        )


        return success_response(

            message="Payment fetched successfully.",

            data=response_schema.dump(
                payment
            ),

            status_code=200,

        )



    # =================================================
    # Update Payment
    # Permission: payment.update
    # =================================================

    @jwt_required()
    @permission_required("payment.update")
    @payment_ns.expect(payment_model)
    def put(
        self,
        payment_id
    ):

        try:

            data = update_schema.load(
                request.get_json()
            )


            payment = PaymentService.update_payment(
                payment_id,
                data
            )


            return success_response(

                message="Payment updated successfully.",

                data=response_schema.dump(
                    payment
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
    # Delete Payment
    # Permission: payment.delete
    # =================================================

    @jwt_required()
    @permission_required("payment.delete")
    def delete(
        self,
        payment_id
    ):


        PaymentService.delete_payment(
            payment_id
        )


        return success_response(

            message="Payment deleted successfully.",

            data=None,

            status_code=200,

        )