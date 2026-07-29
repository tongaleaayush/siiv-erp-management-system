from app.core.extensions import db

from app.invoice.models import InvoiceItem


class InvoiceItemRepository:

    @staticmethod
    def create(
        invoice_item: InvoiceItem,
    ) -> InvoiceItem:

        db.session.add(invoice_item)

        db.session.commit()

        db.session.refresh(invoice_item)

        return invoice_item

    @staticmethod
    def create_many(
        invoice_items: list[InvoiceItem],
    ) -> None:

        db.session.add_all(
            invoice_items
        )

        db.session.commit()

    @staticmethod
    def get_by_invoice_id(
        invoice_id: int,
    ) -> list[InvoiceItem]:

        return list(

            db.session.scalars(

                db.select(InvoiceItem).where(

                    InvoiceItem.invoice_id == invoice_id,

                )

            )

        )

    @staticmethod
    def delete_by_invoice_id(
        invoice_id: int,
    ) -> None:

        items = db.session.scalars(

            db.select(InvoiceItem).where(

                InvoiceItem.invoice_id == invoice_id,

            )

        ).all()

        for item in items:

            db.session.delete(item)

        db.session.commit()