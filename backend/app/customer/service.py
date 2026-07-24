from app.customer.models import Customer
from app.customer.repository.customer_repository import CustomerRepository


class CustomerService:
    repository = CustomerRepository()

    @classmethod
    def _generate_customer_code(cls) -> str:
        last_customer = cls.repository.get_last_customer()

        if last_customer is None:
            return "CUS000001"

        last_number = int(last_customer.customer_code[3:])
        next_number = last_number + 1

        return f"CUS{next_number:06d}"

    @classmethod
    def create_customer(cls, customer: Customer) -> Customer:
        existing_customer = cls.repository.get_by_email(customer.email)

        if existing_customer:
            raise ValueError("Email already exists.")

        if customer.gst_number:
            existing_customer = cls.repository.get_by_gst_number(
                customer.gst_number
            )

            if existing_customer:
                raise ValueError("GST number already exists.")

        customer.customer_code = cls._generate_customer_code()

        return cls.repository.create(customer)

    @classmethod
    def get_all_customers(cls) -> list[Customer]:
        return cls.repository.get_all()