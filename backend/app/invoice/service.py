from decimal import Decimal

from app.invoice.models import (
    Invoice,
    InvoiceItem,
)

from app.invoice.repository import (
    InvoiceRepository,
    InvoiceItemRepository,
)

from app.customer.repository.customer_repository import (
    CustomerRepository,
)

from app.product.repository.product_repository import (
    ProductRepository,
)

from app.core.exceptions import (
    NotFoundException,
    ValidationException,
)


class InvoiceService:

    invoice_repository = InvoiceRepository()

    item_repository = InvoiceItemRepository()

    customer_repository = CustomerRepository()

    product_repository = ProductRepository()

    @staticmethod
    def _calculate_invoice(
        items: list,
        products: list,
    ):

        subtotal = Decimal("0")
        total_tax = Decimal("0")
        grand_total = Decimal("0")

        invoice_items = []

        for item, product in zip(
            items,
            products,
        ):

            quantity = Decimal(
                str(item["quantity"])
            )

            unit_price = product.selling_price

            taxable_amount = (
                quantity * unit_price
            )

            gst_amount = (
                taxable_amount
                * product.gst_percentage
                / Decimal("100")
            )

            total_amount = (
                taxable_amount
                + gst_amount
            )

            subtotal += taxable_amount
            total_tax += gst_amount
            grand_total += total_amount

            invoice_items.append(

                InvoiceItem(

                    product_id=product.id,

                    quantity=quantity,

                    unit_price=unit_price,

                    gst_percentage=product.gst_percentage,

                    taxable_amount=taxable_amount,

                    gst_amount=gst_amount,

                    total_amount=total_amount,

                )

            )

        return (
            subtotal,
            total_tax,
            grand_total,
            invoice_items,
        )
    @staticmethod
    def _validate_status_transition(
        current_status: str,
        new_status: str,
    ) -> None:

        allowed = {

            "DRAFT": [
                "DRAFT",
                "SENT",
                "CANCELLED",
            ],

            "SENT": [
                "SENT",
                "PARTIALLY_PAID",
                "PAID",
                "CANCELLED",
            ],

            "PARTIALLY_PAID": [
                "PARTIALLY_PAID",
                "PAID",
            ],

            "PAID": [
                "PAID",
            ],

            "CANCELLED": [
                "CANCELLED",
            ],

        }

        if new_status not in allowed.get(
            current_status,
            [],
        ):

            raise ValidationException(

                f"Cannot change invoice status from '{current_status}' to '{new_status}'."

            )

    @classmethod
    def create_invoice(
        cls,
        data: dict,
    ) -> Invoice:

        customer = cls.customer_repository.get_by_id(
            data["customer_id"]
        )

        if customer is None:

            raise NotFoundException(
                "Customer not found."
            )

        products = []

        for item in data["items"]:

            product = cls.product_repository.get_by_id(
                item["product_id"]
            )

            if product is None:

                raise NotFoundException(
                    f"Product with ID {item['product_id']} not found."
                )

            quantity = Decimal(
                str(item["quantity"])
            )

            if product.stock_quantity < quantity:

                raise ValidationException(
                    f"Insufficient stock for product '{product.name}'."
                )

            products.append(product)

        invoice = Invoice(

            invoice_number=cls.invoice_repository.get_next_invoice_number(),

            customer_id=customer.id,

            invoice_date=data["invoice_date"],

            due_date=data.get(
                "due_date"
            ),

            subtotal=Decimal("0"),

            cgst_amount=Decimal("0"),

            sgst_amount=Decimal("0"),

            igst_amount=Decimal("0"),

            total_tax=Decimal("0"),

            grand_total=Decimal("0"),

            status=data.get(
                "status",
                "DRAFT",
            ),

            notes=data.get(
                "notes"
            ),

        )

        (
            subtotal,
            total_tax,
            grand_total,
            invoice_items,
        ) = cls._calculate_invoice(
            data["items"],
            products,
        )

        invoice.subtotal = subtotal
        invoice.total_tax = total_tax
        invoice.grand_total = grand_total
        invoice.cgst_amount = total_tax / Decimal("2")
        invoice.sgst_amount = total_tax / Decimal("2")
        invoice.igst_amount = Decimal("0")

        invoice.paid_amount = Decimal("0")
        invoice.due_amount = grand_total
        invoice.payment_status = "UNPAID"

        invoice = cls.invoice_repository.create(
            invoice
        )

        for item in invoice_items:

            item.invoice_id = invoice.id

        cls.item_repository.create_many(
            invoice_items
        )

        # Deduct Stock
        for item, product in zip(
            data["items"],
            products,
        ):

            quantity = Decimal(
                str(item["quantity"])
            )

            product.stock_quantity -= quantity

            cls.product_repository.update(
                product
            )

        return invoice

    @classmethod
    def get_all_invoices(
        cls,
        *,
        search: str | None = None,
        page: int = 1,
        per_page: int = 10,
        sort_by: str | None = None,
        sort_order: str = "asc",
    ):

        return cls.invoice_repository.list_invoices(

            search=search,

            page=page,

            per_page=per_page,

            sort_by=sort_by,

            sort_order=sort_order,

        )

    @classmethod
    def get_invoice_by_id(
        cls,
        invoice_id: int,
    ) -> Invoice:

        invoice = cls.invoice_repository.get_by_id(
            invoice_id
        )

        if invoice is None:

            raise NotFoundException(
                "Invoice not found."
            )

        return invoice

    @classmethod
    def update_invoice(
        cls,
        invoice_id: int,
        data: dict,
    ) -> Invoice:

        invoice = cls.invoice_repository.get_by_id(
            invoice_id
        )

        if invoice is None:

            raise NotFoundException(
                "Invoice not found."
            )

        customer = cls.customer_repository.get_by_id(
            data["customer_id"]
        )

        if customer is None:

            raise NotFoundException(
                "Customer not found."
            )

        products = []

        # Restore stock from old invoice
        old_items = cls.item_repository.get_by_invoice_id(
            invoice.id
        )

        for old_item in old_items:

            product = cls.product_repository.get_by_id(
                old_item.product_id
            )

            if product:

                product.stock_quantity += old_item.quantity

                cls.product_repository.update(
                    product
                )

        # Validate new products and stock
        for item in data["items"]:

            product = cls.product_repository.get_by_id(
                item["product_id"]
            )

            if product is None:

                raise NotFoundException(
                    f"Product with ID {item['product_id']} not found."
                )

            quantity = Decimal(
                str(item["quantity"])
            )

            if product.stock_quantity < quantity:

                raise ValidationException(
                    f"Insufficient stock for product '{product.name}'."
                )

            products.append(product)

        # Update invoice details
        invoice.customer_id = customer.id

        invoice.invoice_date = data["invoice_date"]

        invoice.due_date = data.get(
            "due_date"
        )

        new_status = data.get(
           "status",
           invoice.status,
        )

        cls._validate_status_transition(
            invoice.status,
            new_status,
        )

        invoice.status = new_status
        invoice.notes = data.get(
            "notes"
        )

        (
            subtotal,
            total_tax,
            grand_total,
            invoice_items,
        ) = cls._calculate_invoice(
            data["items"],
            products,
        )

        invoice.subtotal = subtotal

        invoice.total_tax = total_tax

        invoice.grand_total = grand_total

        invoice.cgst_amount = (
            total_tax / Decimal("2")
        )

        invoice.sgst_amount = (
            total_tax / Decimal("2")
        )

        invoice.igst_amount = Decimal("0")

        invoice.due_amount = (
            grand_total
            - invoice.paid_amount
        )

        if invoice.paid_amount == Decimal("0"):

            invoice.payment_status = "UNPAID"

        elif invoice.due_amount == Decimal("0"):

            invoice.payment_status = "PAID"

        else:

            invoice.payment_status = "PARTIALLY_PAID"

        # Replace invoice items
        cls.item_repository.delete_by_invoice_id(
            invoice.id
        )

        for invoice_item in invoice_items:

            invoice_item.invoice_id = invoice.id

        cls.item_repository.create_many(
            invoice_items
        )

        # Deduct stock again
        for item, product in zip(
            data["items"],
            products,
        ):

            quantity = Decimal(
                str(item["quantity"])
            )

            product.stock_quantity -= quantity

            cls.product_repository.update(
                product
            )

        invoice = cls.invoice_repository.update(
            invoice
        )

        return invoice

@classmethod
def delete_invoice(
    cls,
    invoice_id: int,
    deleted_by: int,
) -> None:

    invoice = cls.invoice_repository.get_by_id(
        invoice_id
    )

    if invoice is None:

        raise NotFoundException(
            "Invoice not found."
        )

    invoice_items = cls.item_repository.get_by_invoice_id(
        invoice.id
    )

    for item in invoice_items:

        product = cls.product_repository.get_by_id(
            item.product_id
        )

        if product:

            product.stock_quantity += item.quantity

            cls.product_repository.update(
                product
            )

    cls.invoice_repository.delete(
        invoice,
        deleted_by,
    )

    @classmethod
    def restore_invoice(
        cls,
        invoice_id: int,
    ) -> Invoice:

        invoice = cls.invoice_repository.get_deleted_by_id(
            invoice_id
        )

        if invoice is None:

            raise NotFoundException(
                "Deleted invoice not found."
            )

        invoice_items = cls.item_repository.get_by_invoice_id(
            invoice.id
        )

        for item in invoice_items:

            product = cls.product_repository.get_by_id(
                item.product_id
            )

            if product is None:

                continue

            quantity = Decimal(
                str(item.quantity)
            )

            if product.stock_quantity < quantity:

                raise ValidationException(
                    f"Cannot restore invoice. Insufficient stock for product '{product.name}'."
                )

        for item in invoice_items:

            product = cls.product_repository.get_by_id(
                item.product_id
            )

            product.stock_quantity -= item.quantity

            cls.product_repository.update(
                product
            )

        return cls.invoice_repository.restore(
            invoice
        )