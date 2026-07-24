from app.auth.models import Role
from app.core.extensions import db


DEFAULT_ROLES = [
    {
        "code": "SUPER_ADMIN",
        "name": "Super Administrator",
        "description": "Has unrestricted access to the entire ERP.",
        "is_system": True,
    },
    {
        "code": "ADMIN",
        "name": "Administrator",
        "description": "Manages day-to-day ERP operations.",
        "is_system": True,
    },
    {
        "code": "HR_MANAGER",
        "name": "HR Manager",
        "description": "Manages employees and HR operations.",
        "is_system": True,
    },
    {
        "code": "SALES_MANAGER",
        "name": "Sales Manager",
        "description": "Manages sales and customers.",
        "is_system": True,
    },
    {
        "code": "PURCHASE_MANAGER",
        "name": "Purchase Manager",
        "description": "Manages vendors and purchases.",
        "is_system": True,
    },
    {
        "code": "STORE_MANAGER",
        "name": "Store Manager",
        "description": "Manages inventory and warehouses.",
        "is_system": True,
    },
    {
        "code": "ACCOUNTANT",
        "name": "Accountant",
        "description": "Manages accounting and finance.",
        "is_system": True,
    },
]

def seed_roles():
    """
    Seed default system roles.
    """

    for role_data in DEFAULT_ROLES:

        existing = Role.query.filter_by(
            code=role_data["code"]
        ).first()

        if existing:
            print(f"✓ {role_data['code']} already exists.")
            continue

        role = Role(**role_data)
        db.session.add(role)
        print(f"✓ Created role: {role.code}")

    db.session.commit()