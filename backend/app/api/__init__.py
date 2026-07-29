from app.api.v1.health import health_ns

from app.auth.routes import auth_ns
from app.customer.routes import customer_ns
from app.product.routes import product_ns
from app.invoice.routes import invoice_ns


def register_namespaces(api):

    api.add_namespace(
        health_ns,
        path="/v1/health",
    )

    api.add_namespace(
        auth_ns,
        path="/v1/auth",
    )

    api.add_namespace(
        customer_ns,
        path="/v1/customers",
    )

    api.add_namespace(
        product_ns,
        path="/v1/products",
    )

    api.add_namespace(
        invoice_ns,
        path="/v1/invoices",
    )