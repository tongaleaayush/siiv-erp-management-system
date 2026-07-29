from decimal import Decimal

from app.payment.models import Payment
from app.payment.repository import PaymentRepository

from app.invoice.repository import InvoiceRepository

from app.core.exceptions import (
    NotFoundException,
    ValidationException,
)


class PaymentService:

    payment_repository = PaymentRepository()

    invoice_repository = InvoiceRepository()

@classmethod
def create_payment(
    cls,
    data: dict,
) -> Payment:

    invoice = cls.invoice_repository.get_by_id(
        data["invoice_id"]
    )

    if invoice is None:

        raise NotFoundException(
            "Invoice not found."
        )

    amount = Decimal(
        str(data["amount"])
    )

    if amount <= Decimal("0"):

        raise ValidationException(
            "Payment amount must be greater than zero."
        )