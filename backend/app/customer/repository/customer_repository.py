from datetime import datetime, timezone

from sqlalchemy import text

from app.core.extensions import db
from app.core.query.query_builder import QueryBuilder
from app.customer.models import Customer


class CustomerRepository:


    @staticmethod
    def create(
        customer: Customer
    ) -> Customer:

        db.session.add(customer)

        db.session.commit()

        db.session.refresh(customer)

        return customer



    @staticmethod
    def get_by_id(
        customer_id: int
    ) -> Customer | None:

        return db.session.scalar(

            db.select(Customer).where(

                Customer.id == customer_id,

                Customer.is_deleted.is_(False),

            )

        )



    @staticmethod
    def get_by_customer_code(
        customer_code: str
    ) -> Customer | None:

        return db.session.scalar(

            db.select(Customer).where(

                Customer.customer_code == customer_code,

                Customer.is_deleted.is_(False),

            )

        )



    @staticmethod
    def get_by_email(
        email: str
    ) -> Customer | None:

        return db.session.scalar(

            db.select(Customer).where(

                Customer.email == email,

                Customer.is_deleted.is_(False),

            )

        )



    @staticmethod
    def get_by_gst_number(
        gst_number: str
    ) -> Customer | None:

        return db.session.scalar(

            db.select(Customer).where(

                Customer.gst_number == gst_number,

                Customer.is_deleted.is_(False),

            )

        )



    @staticmethod
    def list_customers(
        *,
        search: str | None = None,
        filters: dict | None = None,
        page: int = 1,
        per_page: int = 10,
        sort_by: str | None = None,
        sort_order: str = "asc",
    ):


        builder = QueryBuilder(

            query=db.select(Customer).where(

                Customer.is_deleted.is_(False)

            ),

            model=Customer,

        )



        builder.search(

            search=search,

            columns=[

                Customer.customer_code,

                Customer.name,

                Customer.email,

                Customer.phone,

                Customer.contact_person,

            ],

        )



        if filters:

            builder.filter(

                filters=filters

            )



        total_records = builder.count()



        query = (

            builder

            .sort(

                sort_by=sort_by,

                sort_order=sort_order,

                default_sort="id",

                allowed_fields={

                    "id",

                    "customer_code",

                    "name",

                    "email",

                    "created_at",

                },

            )

            .paginate(

                page=page,

                per_page=per_page,

            )

            .build()

        )



        customers = list(

            db.session.scalars(query)

        )



        return customers, total_records



    @staticmethod
    def get_next_customer_code() -> str:


        result = db.session.execute(

            text(

                "SELECT nextval('customer_code_sequence')"

            )

        )


        number = result.scalar()


        return f"CUS{number:06d}"



    @staticmethod
    def update(
        customer: Customer
    ) -> Customer:


        db.session.commit()

        db.session.refresh(customer)

        return customer



    @staticmethod
    def delete(
        customer: Customer,
        deleted_by: int,
    ) -> None:


        customer.is_deleted = True

        customer.deleted_by = deleted_by

        customer.deleted_at = datetime.now(

            timezone.utc

        )


        db.session.commit()

    @staticmethod
    def restore(
        customer: Customer
    ) -> Customer:


        customer.is_deleted = False

        customer.deleted_by = None

        customer.deleted_at = None


        db.session.commit()

        db.session.refresh(customer)


        return customer    

    @staticmethod
    def get_deleted_by_id(
        customer_id: int
    ) -> Customer | None:


        return db.session.scalar(

            db.select(Customer).where(

                Customer.id == customer_id,

                Customer.is_deleted.is_(True),

            )

        )