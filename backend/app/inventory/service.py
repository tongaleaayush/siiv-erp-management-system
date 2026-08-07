from decimal import Decimal
from datetime import date


from app.inventory.models import InventoryTransaction

from app.inventory.repository import InventoryRepository

from app.product.repository import ProductRepository

from app.core.exceptions import (
    NotFoundException,
    ValidationException,
)


class InventoryService:


    inventory_repository = InventoryRepository()

    product_repository = ProductRepository()



    # =====================================================
    # Create Inventory Transaction
    # =====================================================

    @classmethod
    def create_transaction(
        cls,
        data: dict,
        user_id: int | None = None,
    ) -> InventoryTransaction:


        # 1. Fetch Product

        product = cls.product_repository.get_by_id(

            data["product_id"]

        )


        if product is None:

            raise NotFoundException(

                "Product not found."

            )



        # 2. Convert quantity

        quantity = Decimal(

            str(data["quantity"])

        )


        if quantity <= Decimal("0"):

            raise ValidationException(

                "Quantity must be greater than zero."

            )



        transaction_type = data["transaction_type"].upper()



        # 3. Calculate Stock

        previous_stock = Decimal(

            str(product.stock_quantity)

        )


        if transaction_type == "IN":


            current_stock = (

                previous_stock + quantity

            )


        elif transaction_type == "OUT":


            if quantity > previous_stock:

                raise ValidationException(

                    "Insufficient stock."

                )


            current_stock = (

                previous_stock - quantity

            )


        else:


            raise ValidationException(

                "Transaction type must be IN or OUT."

            )



        # 4. Update Product Stock

        product.stock_quantity = current_stock


        cls.product_repository.update(

            product

        )



        # 5. Create Inventory History

        transaction = InventoryTransaction(

            product_id=product.id,

            transaction_type=transaction_type,

            quantity=quantity,

            previous_stock=previous_stock,

            current_stock=current_stock,

            batch_number=data.get(

                "batch_number"

            ),

            remarks=data.get(

                "remarks"

            ),

            transaction_date=data.get(

                "transaction_date"

            ) or date.today(),

            created_by=user_id,

        )



        transaction = cls.inventory_repository.create(

            transaction

        )


        return transaction



    # =====================================================
    # Get All Transactions
    # =====================================================

    @classmethod
    def get_all_transactions(cls):

        return cls.inventory_repository.get_all()



    # =====================================================
    # Get Transaction By ID
    # =====================================================

    @classmethod
    def get_transaction_by_id(
        cls,
        transaction_id: int,
    ):


        transaction = cls.inventory_repository.get_by_id(

            transaction_id

        )


        if transaction is None:

            raise NotFoundException(

                "Inventory transaction not found."

            )


        return transaction



    # =====================================================
    # Get Product Stock History
    # =====================================================

    @classmethod
    def get_product_history(
        cls,
        product_id: int,
    ):


        return cls.inventory_repository.get_by_product_id(

            product_id

        )



    # =====================================================
    # Delete Transaction
    # =====================================================

    @classmethod
    def delete_transaction(
        cls,
        transaction_id: int,
    ):


        transaction = cls.inventory_repository.get_by_id(

            transaction_id

        )


        if transaction is None:

            raise NotFoundException(

                "Inventory transaction not found."

            )


        cls.inventory_repository.delete(

            transaction

        )

    # =====================================================
    # Get Current Stock
    # =====================================================

    @classmethod
    def get_current_stock(
        cls,
        product_id: int,
    ):


        stock = cls.inventory_repository.get_current_stock(
            product_id
        )


        if stock is None:

            raise NotFoundException(
                "Product not found."
            )


        return {

            "product_id": product_id,

            "current_stock": str(stock)

        }    