from decimal import Decimal
from datetime import date

from app.payment.models import Payment
from app.payment.repository import PaymentRepository

from app.invoice.repository import InvoiceRepository

from app.core.extensions import db

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

        # 1. Fetch invoice

        invoice = cls.invoice_repository.get_by_id(
            data["invoice_id"]
        )


        if invoice is None:

            raise NotFoundException(
                "Invoice not found."
            )


        # 2. Convert amount to Decimal

        amount = Decimal(
            str(data["amount"])
        )


        # 3. Validate payment amount

        if amount <= Decimal("0"):

            raise ValidationException(
                "Payment amount must be greater than zero."
            )


        # 4. Check overpayment

        if amount > invoice.due_amount:

            raise ValidationException(
                "Payment amount cannot be greater than due amount."
            )


        # 5. Create payment object

        payment = Payment(

            invoice_id=invoice.id,

            payment_date=data.get("payment_date") or date.today(),

            amount=amount,

            payment_method=data.get(
                "payment_method"
            ),

            reference_number=data.get(
                "reference_number"
            ),

            notes=data.get(
                "notes"
            ),

        )


        # 6. Save payment

        payment = cls.payment_repository.create(
            payment
        )


        # 7. Update invoice payment details

        invoice.paid_amount = (
            invoice.paid_amount + amount
        )


        invoice.due_amount = (
            invoice.grand_total - invoice.paid_amount
        )


        # 8. Update payment status

        if invoice.due_amount == Decimal("0"):

            invoice.payment_status = "PAID"


        elif invoice.paid_amount > Decimal("0"):

            invoice.payment_status = "PARTIALLY_PAID"


        else:

            invoice.payment_status = "UNPAID"


        db.session.commit()


        return payment



    # =====================================================
    # Get All Payments
    # =====================================================

    @classmethod
    def get_all_payments(
        cls
    ) -> list[Payment]:

        return cls.payment_repository.get_all()



    # =====================================================
    # Get Payment By ID
    # =====================================================

    @classmethod
    def get_payment_by_id(
        cls,
        payment_id: int,
    ) -> Payment:


        payment = cls.payment_repository.get_by_id(
            payment_id
        )


        if payment is None:

            raise NotFoundException(
                "Payment not found."
            )


        return payment

    # =====================================================
    # Update Payment
    # =====================================================

    @classmethod
    def update_payment(
        cls,
        payment_id: int,
        data: dict,
    ) -> Payment:


        payment = cls.payment_repository.get_by_id(
            payment_id
        )


        if payment is None:

            raise NotFoundException(
                "Payment not found."
            )


        # Update allowed fields

        if "payment_date" in data:

            payment.payment_date = data["payment_date"]


        if "payment_method" in data:

            payment.payment_method = data["payment_method"]


        if "reference_number" in data:

            payment.reference_number = data["reference_number"]


        if "notes" in data:

            payment.notes = data["notes"]



        updated_payment = cls.payment_repository.update(
            payment
        )


        return updated_payment

    # =====================================================
    # Delete Payment
    # =====================================================

    @classmethod
    def delete_payment(
        cls,
        payment_id: int,
    ) -> None:


        payment = cls.payment_repository.get_by_id(
            payment_id
        )


        if payment is None:

            raise NotFoundException(
                "Payment not found."
            )


        cls.payment_repository.delete(
            payment
        )    