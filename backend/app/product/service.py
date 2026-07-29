from flask_jwt_extended import get_jwt_identity

from app.product.models import Product
from app.product.repository.product_repository import ProductRepository

from app.core.exceptions import (
    NotFoundException,
)


class ProductService:

    repository = ProductRepository()

    @classmethod
    def create_product(
        cls,
        product: Product,
    ) -> Product:

        product.product_code = (
            cls.repository.get_next_product_code()
        )

        return cls.repository.create(
            product
        )

    @classmethod
    def list_products(
        cls,
        *,
        search=None,
        filters=None,
        page=1,
        per_page=10,
        sort_by=None,
        sort_order="asc",
    ):

        return cls.repository.list_products(

            search=search,

            filters=filters,

            page=page,

            per_page=per_page,

            sort_by=sort_by,

            sort_order=sort_order,

        )

    @classmethod
    def get_product_by_id(
        cls,
        product_id: int,
    ) -> Product:

        product = (
            cls.repository.get_by_id(
                product_id
            )
        )

        if product is None:

            raise NotFoundException(
                "Product not found."
            )

        return product

    @classmethod
    def update_product(
        cls,
        product_id: int,
        data: dict,
    ) -> Product:

        product = (
            cls.get_product_by_id(
                product_id
            )
        )

        for key, value in data.items():

            setattr(
                product,
                key,
                value,
            )

        return cls.repository.update(
            product
        )

    @classmethod
    def delete_product(
        cls,
        product_id: int,
    ) -> None:

        product = (
            cls.get_product_by_id(
                product_id
            )
        )

        deleted_by = int(
            get_jwt_identity()
        )

        cls.repository.delete(

            product,

            deleted_by,

        )

    @classmethod
    def restore_product(
        cls,
        product_id: int,
    ) -> Product:

        product = cls.repository.get_deleted_by_id(

            product_id

        )

        if product is None:

            raise NotFoundException(

                "Deleted product not found."

            )

        return cls.repository.restore(

            product

        )