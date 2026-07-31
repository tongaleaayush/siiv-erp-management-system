from app.supplier.models import Supplier
from app.supplier.repository.supplier_repository import SupplierRepository

from app.core.exceptions import (
    DuplicateException,
    NotFoundException,
)


class SupplierService:

    repository = SupplierRepository()


    # =====================================================
    # Create Supplier
    # =====================================================

    @classmethod
    def create_supplier(
        cls,
        supplier: Supplier,
    ) -> Supplier:


        existing_supplier = (
            cls.repository.get_by_email(
                supplier.email
            )
        )


        if existing_supplier:

            raise DuplicateException(
                "Email already exists."
            )


        if supplier.gst_number:

            existing_supplier = (
                cls.repository.get_by_gst_number(
                    supplier.gst_number
                )
            )


            if existing_supplier:

                raise DuplicateException(
                    "GST number already exists."
                )


        supplier.supplier_code = (
            cls.repository.get_next_supplier_code()
        )


        return cls.repository.create(
            supplier
        )



    # =====================================================
    # List Suppliers
    # =====================================================

    @classmethod
    def list_suppliers(
        cls,
        *,
        search=None,
        filters=None,
        page=1,
        per_page=10,
        sort_by=None,
        sort_order="asc",
    ):


        return cls.repository.list_suppliers(

            search=search,

            filters=filters,

            page=page,

            per_page=per_page,

            sort_by=sort_by,

            sort_order=sort_order,

        )



    # =====================================================
    # Get Supplier
    # =====================================================

    @classmethod
    def get_supplier_by_id(
        cls,
        supplier_id: int,
    ) -> Supplier:


        supplier = (
            cls.repository.get_by_id(
                supplier_id
            )
        )


        if supplier is None:

            raise NotFoundException(
                "Supplier not found."
            )


        return supplier



    # =====================================================
    # Update Supplier
    # =====================================================

    @classmethod
    def update_supplier(
        cls,
        supplier_id: int,
        data: dict,
    ) -> Supplier:


        supplier = (
            cls.get_supplier_by_id(
                supplier_id
            )
        )


        if "email" in data:


            existing_supplier = (
                cls.repository.get_by_email(
                    data["email"]
                )
            )


            if (
                existing_supplier
                and existing_supplier.id != supplier.id
            ):

                raise DuplicateException(
                    "Email already exists."
                )



        if (
            "gst_number" in data
            and data["gst_number"]
        ):


            existing_supplier = (
                cls.repository.get_by_gst_number(
                    data["gst_number"]
                )
            )


            if (
                existing_supplier
                and existing_supplier.id != supplier.id
            ):

                raise DuplicateException(
                    "GST number already exists."
                )



        for key, value in data.items():

            setattr(
                supplier,
                key,
                value,
            )



        return cls.repository.update(
            supplier
        )



    # =====================================================
    # Delete Supplier (Soft Delete)
    # =====================================================

    @classmethod
    def delete_supplier(
        cls,
        supplier_id: int,
    ) -> None:


        supplier = (
            cls.get_supplier_by_id(
                supplier_id
            )
        )


        cls.repository.delete(
            supplier
        )



    # =====================================================
    # Restore Supplier
    # =====================================================

    @classmethod
    def restore_supplier(
        cls,
        supplier_id: int,
    ) -> Supplier:


        supplier = (
            cls.repository.get_deleted_by_id(
                supplier_id
            )
        )


        if supplier is None:

            raise NotFoundException(
                "Deleted supplier not found."
            )


        return cls.repository.restore(
            supplier
        )