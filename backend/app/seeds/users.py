from app.core.extensions import db
from app.auth.models.user import User
from app.core.security import hash_password



def seed_users():
    """
    Seed default application users.
    """


    # Check Admin User

    admin = User.query.filter_by(
        email="admin@siiv.com"
    ).first()


    if admin:

        print(
            "✓ admin@siiv.com already exists."
        )

    else:

        admin = User(
            full_name="System Administrator",
            email="admin@siiv.com",
            password_hash=hash_password(
                "Admin@123"
            ),
            role_id=1,
            is_active=True,
        )

        db.session.add(admin)

        print(
            "✓ Admin user created."
        )



    # Check View User

    view_user = User.query.filter_by(
        email="view@siiv.com"
    ).first()


    if view_user:

        print(
            "✓ view@siiv.com already exists."
        )

    else:

        view_user = User(
            full_name="View User",
            email="view@siiv.com",
            password_hash=hash_password(
                "View@123"
            ),
            role_id=9,
            is_active=True,
        )

        db.session.add(view_user)

        print(
            "✓ View user created."
        )



    db.session.commit()


    print(
        "Users seeding completed."
    )