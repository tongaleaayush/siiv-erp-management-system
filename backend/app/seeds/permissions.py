from app.auth.models import Permission
from app.core.extensions import db


DEFAULT_PERMISSIONS = [

    # =====================================================
    # Customer Permissions
    # =====================================================

    {
        "code": "customer.view",
        "name": "View Customers",
        "description": "Can view customer records.",
    },
    {
        "code": "customer.create",
        "name": "Create Customer",
        "description": "Can create new customers.",
    },
    {
        "code": "customer.update",
        "name": "Update Customer",
        "description": "Can update existing customers.",
    },
    {
        "code": "customer.delete",
        "name": "Delete Customer",
        "description": "Can delete customers.",
    },

    # =====================================================
    # Product Permissions
    # =====================================================

    {
        "code": "product.view",
        "name": "View Products",
        "description": "Can view product records.",
    },
    {
        "code": "product.create",
        "name": "Create Product",
        "description": "Can create new products.",
    },
    {
        "code": "product.update",
        "name": "Update Product",
        "description": "Can update existing products.",
    },
    {
        "code": "product.delete",
        "name": "Delete Product",
        "description": "Can delete products.",
    },

    # =====================================================
    # Invoice Permissions
    # =====================================================

    {
        "code": "invoice.view",
        "name": "View Invoices",
        "description": "Can view invoices.",
    },
    {
        "code": "invoice.create",
        "name": "Create Invoice",
        "description": "Can create invoices.",
    },
    {
        "code": "invoice.update",
        "name": "Update Invoice",
        "description": "Can update invoices.",
    },
    {
        "code": "invoice.delete",
        "name": "Delete Invoice",
        "description": "Can delete invoices.",
    },
]


def seed_permissions():
    """
    Seed default system permissions.
    """

    for permission_data in DEFAULT_PERMISSIONS:

        existing = Permission.query.filter_by(
            code=permission_data["code"]
        ).first()

        if existing:

            print(
                f"✓ {permission_data['code']} already exists."
            )

            continue

        permission = Permission(
            **permission_data
        )

        db.session.add(
            permission
        )

        print(
            f"✓ Created permission: {permission.code}"
        )

    db.session.commit()