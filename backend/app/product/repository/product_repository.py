from datetime import datetime, timezone

from sqlalchemy import text

from app.core.extensions import db
from app.core.query.query_builder import QueryBuilder
from app.product.models import Product


class ProductRepository:

    @staticmethod
    def create(
        product: Product
    ) -> Product:

        db.session.add(product)

        db.session.commit()

        db.session.refresh(product)

        return product

    @staticmethod
    def get_by_id(
        product_id: int
    ) -> Product | None:

        return db.session.scalar(

            db.select(Product).where(

                Product.id == product_id,

                Product.is_deleted.is_(False),

            )

        )

    @staticmethod
    def get_by_product_code(
        product_code: str
    ) -> Product | None:

        return db.session.scalar(

            db.select(Product).where(

                Product.product_code == product_code,

                Product.is_deleted.is_(False),

            )

        )

    @staticmethod
    def list_products(
        *,
        search: str | None = None,
        filters: dict | None = None,
        page: int = 1,
        per_page: int = 10,
        sort_by: str | None = None,
        sort_order: str = "asc",
    ):

        builder = QueryBuilder(

            query=db.select(Product).where(

                Product.is_deleted.is_(False)

            ),

            model=Product,

        )

        builder.search(

            search=search,

            columns=[

                Product.product_code,

                Product.name,

                Product.hsn_code,

                Product.unit,

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

                    "product_code",

                    "name",

                    "purchase_price",

                    "selling_price",

                    "gst_percentage",

                    "created_at",

                },

            )

            .paginate(

                page=page,

                per_page=per_page,

            )

            .build()

        )

        products = list(

            db.session.scalars(query)

        )

        return products, total_records

    @staticmethod
    def get_next_product_code() -> str:

        result = db.session.execute(

            text(

                "SELECT nextval('product_code_sequence')"

            )

        )

        number = result.scalar()

        return f"PRD{number:06d}"

    @staticmethod
    def update(
        product: Product
    ) -> Product:

        db.session.commit()

        db.session.refresh(product)

        return product

    @staticmethod
    def delete(
        product: Product,
        deleted_by: int,
    ) -> None:

        product.is_deleted = True

        product.deleted_by = deleted_by

        product.deleted_at = datetime.now(

            timezone.utc

        )

        db.session.commit()

    @staticmethod
    def restore(
        product: Product
    ) -> Product:

        product.is_deleted = False

        product.deleted_by = None

        product.deleted_at = None

        db.session.commit()

        db.session.refresh(product)

        return product

    @staticmethod
    def get_deleted_by_id(
        product_id: int
    ) -> Product | None:

        return db.session.scalar(

            db.select(Product).where(

                Product.id == product_id,

                Product.is_deleted.is_(True),

            )

        )