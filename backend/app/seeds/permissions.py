from app.auth.models import Permission
from app.core.extensions import db


DEFAULT_PERMISSIONS = [
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
            print(f"✓ {permission_data['code']} already exists.")
            continue

        permission = Permission(**permission_data)
        db.session.add(permission)

        print(f"✓ Created permission: {permission.code}")

    db.session.commit()