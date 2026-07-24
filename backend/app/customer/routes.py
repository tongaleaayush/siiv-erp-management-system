from flask import request
from flask_restx import Namespace, Resource
from marshmallow import ValidationError

from app.customer.models import Customer
from app.customer.schemas import (
    CustomerCreateSchema,
    CustomerResponseSchema,
)
from app.customer.service import CustomerService

customer_ns = Namespace(
    "customers",
    description="Customer management operations",
)

create_schema = CustomerCreateSchema()
response_schema = CustomerResponseSchema()
response_schema_many = CustomerResponseSchema(many=True)


@customer_ns.route("")
class CustomerListResource(Resource):
    def get(self):
        customers = CustomerService.get_all_customers()

        return response_schema_many.dump(customers), 200

    def post(self):
        try:
            data = create_schema.load(request.get_json())

            customer = Customer(**data)

            customer = CustomerService.create_customer(customer)

            return response_schema.dump(customer), 201

        except ValidationError as error:
            return {"errors": error.messages}, 400

        except ValueError as error:
            return {"message": str(error)}, 400