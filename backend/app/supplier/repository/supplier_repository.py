from datetime import datetime, timezone

from sqlalchemy import text

from app.core.extensions import db
from app.core.query.query_builder import QueryBuilder

from app.supplier.models import Supplier



class SupplierRepository:


    # =====================================================
    # Create Supplier
    # =====================================================

    @staticmethod
    def create(
        supplier: Supplier
    ) -> Supplier:

        db.session.add(supplier)

        db.session.commit()

        db.session.refresh(supplier)

        return supplier



    # =====================================================
    # Get Supplier By ID
    # =====================================================

    @staticmethod
    def get_by_id(
        supplier_id: int
    ) -> Supplier | None:


        return db.session.scalar(

            db.select(Supplier).where(

                Supplier.id == supplier_id,

                Supplier.is_deleted.is_(False),

            )

        )



    # =====================================================
    # Get Supplier By Code
    # =====================================================

    @staticmethod
    def get_by_supplier_code(
        supplier_code: str
    ) -> Supplier | None:


        return db.session.scalar(

            db.select(Supplier).where(

                Supplier.supplier_code == supplier_code,

                Supplier.is_deleted.is_(False),

            )

        )



    # =====================================================
    # Get Supplier By Email
    # =====================================================

    @staticmethod
    def get_by_email(
        email: str
    ) -> Supplier | None:


        return db.session.scalar(

            db.select(Supplier).where(

                Supplier.email == email,

                Supplier.is_deleted.is_(False),

            )

        )



    # =====================================================
    # Get Supplier By GST
    # =====================================================

    @staticmethod
    def get_by_gst_number(
        gst_number: str
    ) -> Supplier | None:


        return db.session.scalar(

            db.select(Supplier).where(

                Supplier.gst_number == gst_number,

                Supplier.is_deleted.is_(False),

            )

        )



    # =====================================================
    # List Suppliers
    # =====================================================

    @staticmethod
    def list_suppliers(
        *,
        search=None,
        filters=None,
        page=1,
        per_page=10,
        sort_by=None,
        sort_order="asc",
    ):


        builder = QueryBuilder(

            query=db.select(Supplier).where(

                Supplier.is_deleted.is_(False)

            ),

            model=Supplier,

        )



        # Search

        builder.search(

            search=search,

            columns=[

                Supplier.supplier_code,

                Supplier.name,

                Supplier.email,

                Supplier.phone,

                Supplier.contact_person,

            ],

        )



        # Filters

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

                    "supplier_code",

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



        suppliers = list(

            db.session.scalars(query)

        )


        return suppliers, total_records



    # =====================================================
    # Generate Supplier Code
    # =====================================================

    @staticmethod
    def get_next_supplier_code() -> str:


        result = db.session.execute(

            text(

                "SELECT nextval('supplier_code_sequence')"

            )

        )


        number = result.scalar()


        return f"SUP{number:06d}"



    # =====================================================
    # Update Supplier
    # =====================================================

    @staticmethod
    def update(
        supplier: Supplier
    ) -> Supplier:


        db.session.commit()

        db.session.refresh(supplier)

        return supplier



    # =====================================================
    # Soft Delete Supplier
    # =====================================================

    @staticmethod
    def delete(
        supplier: Supplier,
        deleted_by: int,
    ) -> None:


        supplier.is_deleted = True

        supplier.deleted_by = deleted_by

        supplier.deleted_at = datetime.now(

            timezone.utc

        )


        db.session.commit()



    # =====================================================
    # Restore Supplier
    # =====================================================

    @staticmethod
    def restore(
        supplier: Supplier
    ) -> Supplier:


        supplier.is_deleted = False

        supplier.deleted_by = None

        supplier.deleted_at = None


        db.session.commit()

        db.session.refresh(supplier)


        return supplier



    # =====================================================
    # Get Deleted Supplier
    # =====================================================

    @staticmethod
    def get_deleted_by_id(
        supplier_id: int
    ) -> Supplier | None:


        return db.session.scalar(

            db.select(Supplier).where(

                Supplier.id == supplier_id,

                Supplier.is_deleted.is_(True),

            )

        )