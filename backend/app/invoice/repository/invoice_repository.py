from datetime import datetime, timezone

from sqlalchemy import text

from app.core.extensions import db
from app.core.query.query_builder import QueryBuilder

from app.invoice.models import Invoice


class InvoiceRepository:

    @staticmethod
    def create(
        invoice: Invoice,
    ) -> Invoice:

        db.session.add(invoice)

        db.session.commit()

        db.session.refresh(invoice)

        return invoice

    @staticmethod
    def get_by_id(
        invoice_id: int,
    ) -> Invoice | None:

        return db.session.scalar(

            db.select(Invoice).where(

                Invoice.id == invoice_id,

                Invoice.is_deleted.is_(False),

            )

        )

    @staticmethod
    def get_deleted_by_id(
        invoice_id: int,
    ) -> Invoice | None:

        return db.session.scalar(

            db.select(Invoice).where(

                Invoice.id == invoice_id,

                Invoice.is_deleted.is_(True),

            )

        )

    @staticmethod
    def get_by_invoice_number(
        invoice_number: str,
    ) -> Invoice | None:

        return db.session.scalar(

            db.select(Invoice).where(

                Invoice.invoice_number == invoice_number,

                Invoice.is_deleted.is_(False),

            )

        )

    @staticmethod
    def list_invoices(
        *,
        search: str | None = None,
        filters: dict | None = None,
        page: int = 1,
        per_page: int = 10,
        sort_by: str | None = None,
        sort_order: str = "asc",
    ):

        builder = QueryBuilder(

            query=db.select(Invoice).where(

                Invoice.is_deleted.is_(False)

            ),

            model=Invoice,

        )

        builder.search(

            search=search,

            columns=[

                Invoice.invoice_number,

                Invoice.status,

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

                    "invoice_number",

                    "invoice_date",

                    "status",

                    "grand_total",

                    "created_at",

                },

            )

            .paginate(

                page=page,

                per_page=per_page,

            )

            .build()

        )

        invoices = list(

            db.session.scalars(query)

        )

        return invoices, total_records

    @staticmethod
    def get_next_invoice_number() -> str:

        result = db.session.execute(

            text(

                "SELECT nextval('invoice_number_sequence')"

            )

        )

        number = result.scalar()

        return f"INV{number:06d}"

    @staticmethod
    def update(
        invoice: Invoice,
    ) -> Invoice:

        db.session.commit()

        db.session.refresh(invoice)

        return invoice

    @staticmethod
    def delete(
        invoice: Invoice,
        deleted_by: int,
    ) -> None:

        invoice.is_deleted = True

        invoice.deleted_by = deleted_by

        invoice.deleted_at = datetime.now(

            timezone.utc

        )

        db.session.commit()

    @staticmethod
    def restore(
        invoice: Invoice,
    ) -> Invoice:

        invoice.is_deleted = False

        invoice.deleted_by = None

        invoice.deleted_at = None

        db.session.commit()

        db.session.refresh(invoice)

        return invoice

    @staticmethod
    def get_all(
        query_builder: QueryBuilder,
    ):

        query = db.select(Invoice).where(

            Invoice.is_deleted.is_(False)

        )

        query = query_builder.build(
            query,
            Invoice,
        )

        return db.paginate(
            query,
            page=query_builder.page,
            per_page=query_builder.per_page,
            error_out=False,
        )