from app.seeds.permissions import seed_permissions
from app.seeds.role_permissions import seed_role_permissions
from app.seeds.roles import seed_roles


def seed_all():
    """
    Run all database seeders.
    """

    print("Seeding roles...")
    seed_roles()

    print("Seeding permissions...")
    seed_permissions()

    print("Assigning permissions to roles...")
    seed_role_permissions()

    print("Database seeding completed successfully.")