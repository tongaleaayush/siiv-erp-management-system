from app.core.extensions import db
from app.payment.models import Payment


class PaymentRepository:


    @staticmethod
    def create(
        payment: Payment,
    ) -> Payment:

        db.session.add(payment)

        db.session.commit()

        db.session.refresh(payment)

        return payment



    @staticmethod
    def get_all() -> list[Payment]:

        return list(

            db.session.scalars(

                db.select(Payment)
                .order_by(
                    Payment.id.desc()
                )

            )

        )



    @staticmethod
    def get_by_id(
        payment_id: int,
    ) -> Payment | None:

        return db.session.scalar(

            db.select(Payment)
            .where(
                Payment.id == payment_id
            )

        )



    @staticmethod
    def get_by_invoice_id(
        invoice_id: int,
    ) -> list[Payment]:

        return list(

            db.session.scalars(

                db.select(Payment)
                .where(
                    Payment.invoice_id == invoice_id
                )
                .order_by(
                    Payment.id.desc()
                )

            )

        )



    @staticmethod
    def delete(
        payment: Payment,
    ) -> None:

        db.session.delete(payment)

        db.session.commit()

    @staticmethod
    def update(
        payment: Payment,
    ) -> Payment:

        db.session.commit()

        db.session.refresh(payment)

        return payment    