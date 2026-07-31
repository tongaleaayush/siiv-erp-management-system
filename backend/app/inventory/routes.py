from flask import request

from flask_restx import Namespace, Resource, fields

from flask_jwt_extended import jwt_required

from marshmallow import ValidationError

from app.auth.decorators import permission_required

from app.inventory.schemas import (
    InventoryCreateSchema,
    InventoryResponseSchema,
)

from app.inventory.service import InventoryService

from app.utils.response import (
    success_response,
    error_response,
)


inventory_ns = Namespace(
    "inventory",
    description="Inventory management operations",
)



inventory_model = inventory_ns.model(
    "InventoryTransaction",
    {

        "product_id": fields.Integer(
            required=True,
            description="Product ID",
        ),

        "transaction_type": fields.String(
            required=True,
            description="IN or OUT",
        ),

        "quantity": fields.Float(
            required=True,
            description="Quantity",
        ),

        "batch_number": fields.String(
            required=False,
        ),

        "remarks": fields.String(
            required=False,
        ),

    }
)



create_schema = InventoryCreateSchema()

response_schema = InventoryResponseSchema()

response_schema_many = InventoryResponseSchema(
    many=True
)



# =====================================================
# Inventory List + Create
# =====================================================

@inventory_ns.route("")
class InventoryListResource(Resource):


    @jwt_required()
    @permission_required("inventory.view")
    def get(self):

        transactions = InventoryService.get_all_transactions()


        return success_response(

            message="Inventory transactions fetched successfully.",

            data=response_schema_many.dump(
                transactions
            ),

            status_code=200,

        )



    @jwt_required()
    @permission_required("inventory.create")
    @inventory_ns.expect(
        inventory_model
    )
    def post(self):

        try:

            data = create_schema.load(
                request.get_json()
            )


            transaction = InventoryService.create_transaction(
                data
            )


            return success_response(

                message="Inventory transaction created successfully.",

                data=response_schema.dump(
                    transaction
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
# Get Inventory By ID
# =====================================================

@inventory_ns.route("/<int:transaction_id>")
class InventoryDetailResource(Resource):


    @jwt_required()
    @permission_required("inventory.view")
    def get(
        self,
        transaction_id
    ):


        transaction = InventoryService.get_transaction_by_id(
            transaction_id
        )


        return success_response(

            message="Inventory transaction fetched successfully.",

            data=response_schema.dump(
                transaction
            ),

            status_code=200,

        )



# =====================================================
# Product Inventory History
# =====================================================

@inventory_ns.route("/product/<int:product_id>")
class ProductInventoryHistoryResource(Resource):


    @jwt_required()
    @permission_required("inventory.view")
    def get(
        self,
        product_id
    ):


        transactions = InventoryService.get_product_history(
            product_id
        )


        return success_response(

            message="Product inventory history fetched successfully.",

            data=response_schema_many.dump(
                transactions
            ),

            status_code=200,

        )

# =====================================================
# Get Current Stock
# Permission: inventory.view
# =====================================================

@inventory_ns.route("/stock/<int:product_id>")
class InventoryStockResource(Resource):


    @jwt_required()
    @permission_required("inventory.view")
    def get(
        self,
        product_id
    ):


        stock = InventoryService.get_current_stock(

            product_id

        )


        return success_response(

            message="Current stock fetched successfully.",

            data=stock,

            status_code=200,

        )