from app.customer.models import Customer
from app.customer.repository.customer_repository import CustomerRepository

from app.core.exceptions import (
    DuplicateException,
    NotFoundException,
)


class CustomerService:


    repository = CustomerRepository()





    @classmethod
    def create_customer(
        cls,
        customer: Customer,
    ) -> Customer:


        existing_customer = (

            cls.repository.get_by_email(

                customer.email

            )

        )


        if existing_customer:

            raise DuplicateException(

                "Email already exists."

            )





        if customer.gst_number:


            existing_customer = (

                cls.repository.get_by_gst_number(

                    customer.gst_number

                )

            )


            if existing_customer:

                raise DuplicateException(

                    "GST number already exists."

                )





        customer.customer_code = (

            cls.repository.get_next_customer_code()

        )



        return cls.repository.create(

            customer

        )







    @classmethod
    def list_customers(
        cls,
        *,
        search=None,
        filters=None,
        page=1,
        per_page=10,
        sort_by=None,
        sort_order="asc",
    ):


        return cls.repository.list_customers(

            search=search,

            filters=filters,

            page=page,

            per_page=per_page,

            sort_by=sort_by,

            sort_order=sort_order,

        )







    @classmethod
    def get_customer_by_id(
        cls,
        customer_id: int,
    ) -> Customer:


        customer = (

            cls.repository.get_by_id(

                customer_id

            )

        )


        if customer is None:


            raise NotFoundException(

                "Customer not found."

            )


        return customer







    @classmethod
    def update_customer(
        cls,
        customer_id: int,
        data: dict,
    ) -> Customer:


        customer = (

            cls.get_customer_by_id(

                customer_id

            )

        )





        # Email duplicate check

        if "email" in data:


            existing_customer = (

                cls.repository.get_by_email(

                    data["email"]

                )

            )


            if (

                existing_customer

                and existing_customer.id != customer.id

            ):


                raise DuplicateException(

                    "Email already exists."

                )







        # GST duplicate check

        if (

            "gst_number" in data

            and data["gst_number"]

        ):


            existing_customer = (

                cls.repository.get_by_gst_number(

                    data["gst_number"]

                )

            )


            if (

                existing_customer

                and existing_customer.id != customer.id

            ):


                raise DuplicateException(

                    "GST number already exists."

                )







        # Update only provided fields

        for key, value in data.items():


            setattr(

                customer,

                key,

                value,

            )





        return cls.repository.update(

            customer

        )









    @classmethod
    def delete_customer(
        cls,
        customer_id: int,
    ) -> None:


        customer = (

            cls.get_customer_by_id(

                customer_id

            )

        )


        cls.repository.delete(

            customer

        )