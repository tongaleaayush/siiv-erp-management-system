from app.auth.models import Permission, Role
from app.core.extensions import db


ROLE_PERMISSION_MAP = {

    "SUPER_ADMIN": [

        # Customer Permissions
        "customer.view",
        "customer.create",
        "customer.update",
        "customer.delete",

        # Product Permissions
        "product.view",
        "product.create",
        "product.update",
        "product.delete",

        # Invoice Permissions
        "invoice.view",
        "invoice.create",
        "invoice.update",
        "invoice.delete",
    ],

    "ADMIN": [

        # Customer Permissions
        "customer.view",
        "customer.create",
        "customer.update",
        "customer.delete",

        # Product Permissions
        "product.view",
        "product.create",
        "product.update",
        "product.delete",

        # Invoice Permissions
        "invoice.view",
        "invoice.create",
        "invoice.update",
        "invoice.delete",
    ],
}


def seed_role_permissions():
    """
    Assign permissions to roles.
    """

    for role_code, permission_codes in ROLE_PERMISSION_MAP.items():

        role = Role.query.filter_by(
            code=role_code
        ).first()

        if not role:

            print(
                f"✗ Role not found: {role_code}"
            )

            continue

        for permission_code in permission_codes:

            permission = Permission.query.filter_by(
                code=permission_code
            ).first()

            if not permission:

                print(
                    f"✗ Permission not found: {permission_code}"
                )

                continue

            if permission in role.permissions:

                print(
                    f"✓ {role.code} already has {permission.code}"
                )

                continue

            role.permissions.append(
                permission
            )

            print(
                f"✓ Assigned {permission.code} to {role.code}"
            )

    db.session.commit()