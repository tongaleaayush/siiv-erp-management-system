from flask import request
from flask_restx import Namespace, Resource
from marshmallow import ValidationError

from app.customer.models import Customer
from app.customer.constants import CUSTOMER_FILTER_FIELDS
from app.core.validation.query import QueryValidator

from app.customer.schemas import (
    CustomerCreateSchema,
    CustomerResponseSchema,
    CustomerUpdateSchema,
)

from app.customer.service import CustomerService
from app.utils.response import success_response, error_response


customer_ns = Namespace(
    "customers",
    description="Customer management operations",
)


create_schema = CustomerCreateSchema()
update_schema = CustomerUpdateSchema()

response_schema = CustomerResponseSchema()
response_schema_many = CustomerResponseSchema(many=True)



@customer_ns.route("")
class CustomerListResource(Resource):

    def get(self):

        search = request.args.get("search")

        sort_by = request.args.get("sort_by")

        sort_order = request.args.get(
            "sort_order",
            "asc",
        )


        page = request.args.get(
            "page",
            default=1,
            type=int,
        )


        per_page = request.args.get(
            "per_page",
            default=10,
            type=int,
        )


        # Query validation
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



        # Dynamic filters

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
                    1,
                )

            else:

                field_name = key
                operator = "eq"



            if field_name in CUSTOMER_FILTER_FIELDS:


                if field_name == "is_active":

                    value = value.lower() == "true"



                column = getattr(
                    Customer,
                    field_name,
                    None,
                )


                if column:

                    filters[
                        (
                            column,
                            operator,
                        )
                    ] = value



        customers, total_records = CustomerService.list_customers(
            search=search,
            filters=filters,
            page=page,
            per_page=per_page,
            sort_by=sort_by,
            sort_order=sort_order,
        )



        total_pages = (
            (total_records + per_page - 1) // per_page
            if per_page > 0
            else 0
        )



        meta = {

            "page": page,

            "per_page": per_page,

            "total_records": total_records,

            "total_pages": total_pages,

            "has_next": page < total_pages,

            "has_previous": page > 1,

        }



        return success_response(

            message="Customers fetched successfully.",

            data=response_schema_many.dump(customers),

            meta=meta,

            status_code=200,

        )



    def post(self):

        try:

            data = create_schema.load(
                request.get_json()
            )


            customer = Customer(**data)


            customer = CustomerService.create_customer(
                customer
            )


            return success_response(

                message="Customer created successfully.",

                data=response_schema.dump(customer),

                status_code=201,

            )


        except ValidationError as error:


            return error_response(

                message="Validation failed.",

                errors=error.messages,

                status_code=400,

            )


        except ValueError as error:


            return error_response(

                message=str(error),

                status_code=400,

            )




@customer_ns.route("/<int:customer_id>")
class CustomerResource(Resource):


    def get(self, customer_id: int):

        try:

            customer = CustomerService.get_customer_by_id(
                customer_id
            )


            return success_response(

                message="Customer fetched successfully.",

                data=response_schema.dump(customer),

                status_code=200,

            )


        except ValueError as error:


            return error_response(

                message=str(error),

                status_code=404,

            )



    def put(self, customer_id: int):

        try:

            data = update_schema.load(
                request.get_json()
            )


            customer = CustomerService.update_customer(
                customer_id,
                data,
            )


            return success_response(

                message="Customer updated successfully.",

                data=response_schema.dump(customer),

                status_code=200,

            )


        except ValidationError as error:


            return error_response(

                message="Validation failed.",

                errors=error.messages,

                status_code=400,

            )


        except ValueError as error:


            message = str(error)


            if message == "Customer not found.":

                return error_response(

                    message=message,

                    status_code=404,

                )


            return error_response(

                message=message,

                status_code=400,

            )



    def delete(self, customer_id: int):

        try:

            CustomerService.delete_customer(
                customer_id
            )


            return success_response(

                message="Customer deleted successfully.",

                status_code=200,

            )


        except ValueError as error:


            return error_response(

                message=str(error),

                status_code=404,

            )