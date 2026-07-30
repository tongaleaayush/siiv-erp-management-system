from app.auth.routes import auth_ns
from app.customer.routes import customer_ns
from app.product.routes import product_ns
from app.invoice.routes import invoice_ns
from app.payment.routes import payment_ns


def register_namespaces(api):

    api.add_namespace(
        auth_ns,
        path="/auth"
    )

    api.add_namespace(
        customer_ns,
        path="/customers"
    )

    api.add_namespace(
        product_ns,
        path="/products"
    )

    api.add_namespace(
        invoice_ns,
        path="/invoices"
    )

    api.add_namespace(
        payment_ns,
        path="/payments"
    )