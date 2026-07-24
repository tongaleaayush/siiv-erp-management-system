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
    def list_customers(
        cls,
        *,
        search: str | None = None,
        filters: dict | None = None,
        page: int = 1,
        per_page: int = 10,
        sort_by: str | None = None,
        sort_order: str = "asc",
    ):
     return cls.repository.list_customers(
        search=search,
        filters=filters,
        page=page,
        per_page=per_page,
        sort_by=sort_by,
        sort_order=sort_order,
    )

    @classmethod
    def get_customer_by_id(cls, customer_id: int) -> Customer:
        customer = cls.repository.get_by_id(customer_id)

        if customer is None:
            raise ValueError("Customer not found.")

        return customer

    @classmethod
    def update_customer(
        cls,
        customer_id: int,
        data: dict,
    ) -> Customer:
        customer = cls.get_customer_by_id(customer_id)

        existing_customer = cls.repository.get_by_email(data["email"])

        if (
            existing_customer
            and existing_customer.id != customer.id
        ):
            raise ValueError("Email already exists.")

        if data.get("gst_number"):
            existing_customer = cls.repository.get_by_gst_number(
                data["gst_number"]
            )

            if (
                existing_customer
                and existing_customer.id != customer.id
            ):
                raise ValueError("GST number already exists.")

        for key, value in data.items():
            setattr(customer, key, value)

        return cls.repository.update(customer)

    @classmethod
    def delete_customer(cls, customer_id: int) -> None:
        customer = cls.get_customer_by_id(customer_id)

        cls.repository.delete(customer)