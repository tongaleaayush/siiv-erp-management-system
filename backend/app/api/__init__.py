from app.auth.routes import auth_ns
from app.customer.routes import customer_ns
from app.product.routes import product_ns
from app.invoice.routes import invoice_ns
from app.payment.routes import payment_ns
from app.inventory.routes import inventory_ns
from app.supplier.routes import supplier_ns


def register_namespaces(api):

    api.add_namespace(auth_ns, path="/api/auth")

    api.add_namespace(
        customer_ns,
        path="/api/customers"
    )

    api.add_namespace(
        product_ns,
        path="/api/products"
    )

    api.add_namespace(
        invoice_ns,
        path="/api/invoices"
    )

    api.add_namespace(
        payment_ns,
        path="/api/payments"
    )

    api.add_namespace(
        inventory_ns,
        path="/api/inventory"
    )

    api.add_namespace(
        supplier_ns,
        path="/api/suppliers"
    )