from app.core.extensions import db

from app.inventory.models import InventoryTransaction


class InventoryRepository:


    # =====================================================
    # Create Inventory Transaction
    # =====================================================

    @staticmethod
    def create(
        transaction: InventoryTransaction,
    ) -> InventoryTransaction:


        db.session.add(transaction)

        db.session.commit()

        db.session.refresh(transaction)

        return transaction



    # =====================================================
    # Get All Inventory Transactions
    # =====================================================

    @staticmethod
    def get_all() -> list[InventoryTransaction]:


        return list(

            db.session.scalars(

                db.select(
                    InventoryTransaction
                )
                .order_by(
                    InventoryTransaction.id.desc()
                )

            )

        )



    # =====================================================
    # Get Inventory Transaction By ID
    # =====================================================

    @staticmethod
    def get_by_id(
        transaction_id: int,
    ) -> InventoryTransaction | None:


        return db.session.scalar(

            db.select(
                InventoryTransaction
            )
            .where(
                InventoryTransaction.id == transaction_id
            )

        )



    # =====================================================
    # Get Transactions By Product ID
    # =====================================================

    @staticmethod
    def get_by_product_id(
        product_id: int,
    ) -> list[InventoryTransaction]:


        return list(

            db.session.scalars(

                db.select(
                    InventoryTransaction
                )
                .where(
                    InventoryTransaction.product_id == product_id
                )
                .order_by(
                    InventoryTransaction.id.desc()
                )

            )

        )



    # =====================================================
    # Delete Inventory Transaction
    # =====================================================

    @staticmethod
    def delete(
        transaction: InventoryTransaction,
    ) -> None:


        db.session.delete(transaction)

        db.session.commit()

    # =====================================================
    # Get Current Stock By Product ID
    # =====================================================

    @staticmethod
    def get_current_stock(
        product_id: int,
    ):

        from app.product.models import Product


        return db.session.scalar(

            db.select(
                Product.stock_quantity
            )
            .where(
                Product.id == product_id
            )

        )    