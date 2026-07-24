from datetime import datetime, timezone

from app.core.extensions import db
from app.core.query.query_builder import QueryBuilder
from app.customer.models import Customer


class CustomerRepository:

    @staticmethod
    def create(customer: Customer) -> Customer:
        db.session.add(customer)
        db.session.commit()
        db.session.refresh(customer)

        return customer


    @staticmethod
    def get_by_id(customer_id: int) -> Customer | None:
        return db.session.scalar(
            db.select(Customer).where(
                Customer.id == customer_id,
                Customer.deleted_at.is_(None),
            )
        )


    @staticmethod
    def get_by_customer_code(
        customer_code: str
    ) -> Customer | None:

        return db.session.scalar(
            db.select(Customer).where(
                Customer.customer_code == customer_code,
                Customer.deleted_at.is_(None),
            )
        )


    @staticmethod
    def get_by_email(
        email: str
    ) -> Customer | None:

        return db.session.scalar(
            db.select(Customer).where(
                Customer.email == email,
                Customer.deleted_at.is_(None),
            )
        )


    @staticmethod
    def get_by_gst_number(
        gst_number: str
    ) -> Customer | None:

        return db.session.scalar(
            db.select(Customer).where(
                Customer.gst_number == gst_number,
                Customer.deleted_at.is_(None),
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
                Customer.deleted_at.is_(None)
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
    def get_last_customer() -> Customer | None:

        return db.session.scalar(
            db.select(Customer)
            .where(Customer.deleted_at.is_(None))
            .order_by(Customer.id.desc())
        )


    @staticmethod
    def update(customer: Customer) -> Customer:

        db.session.commit()
        db.session.refresh(customer)

        return customer


    @staticmethod
    def delete(customer: Customer) -> None:

        customer.deleted_at = datetime.now(
            timezone.utc
        )

        db.session.commit()