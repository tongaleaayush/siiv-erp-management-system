import sys
import os


sys.path.append(
    os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            "../.."
        )
    )
)


from app import create_app

from app.core.extensions import db

from app.auth.models.user import User
from app.auth.models.role import Role

import bcrypt



app = create_app()



with app.app_context():


    view_role = Role.query.filter_by(
        code="VIEW_ONLY"
    ).first()


    if not view_role:

        print("VIEW_ONLY role not found")

        exit()



    existing_user = User.query.filter_by(
        email="view@siiv.com"
    ).first()


    if existing_user:

        print("VIEW user already exists")

        exit()



    password = "View@123"


    password_hash = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")



    user = User(

        full_name="View User",

        email="view@siiv.com",

        password_hash=password_hash,

        is_active=True,

        role=view_role,

    )



    db.session.add(user)

    db.session.commit()



    print(
        "VIEW user created successfully"
    )