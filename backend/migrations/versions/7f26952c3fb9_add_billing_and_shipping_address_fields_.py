"""add billing and shipping address fields to customers

Revision ID: 7f26952c3fb9
Revises: eae380b5d27a
Create Date: 2026-07-31 12:22:33.160704

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "7f26952c3fb9"
down_revision = "eae380b5d27a"
branch_labels = None
depends_on = None


def upgrade():

    with op.batch_alter_table(
        "customers",
        schema=None
    ) as batch_op:

        # ==============================
        # Billing Address
        # ==============================

        batch_op.add_column(
            sa.Column(
                "billing_address_line_1",
                sa.String(length=255),
                nullable=True,
            )
        )

        batch_op.add_column(
            sa.Column(
                "billing_address_line_2",
                sa.String(length=255),
                nullable=True,
            )
        )

        batch_op.add_column(
            sa.Column(
                "billing_city",
                sa.String(length=100),
                nullable=True,
            )
        )

        batch_op.add_column(
            sa.Column(
                "billing_state",
                sa.String(length=100),
                nullable=True,
            )
        )

        batch_op.add_column(
            sa.Column(
                "billing_country",
                sa.String(length=100),
                nullable=False,
                server_default="India",
            )
        )

        batch_op.add_column(
            sa.Column(
                "billing_postal_code",
                sa.String(length=20),
                nullable=True,
            )
        )


        # ==============================
        # Shipping Address
        # ==============================

        batch_op.add_column(
            sa.Column(
                "shipping_address_line_1",
                sa.String(length=255),
                nullable=True,
            )
        )

        batch_op.add_column(
            sa.Column(
                "shipping_address_line_2",
                sa.String(length=255),
                nullable=True,
            )
        )

        batch_op.add_column(
            sa.Column(
                "shipping_city",
                sa.String(length=100),
                nullable=True,
            )
        )

        batch_op.add_column(
            sa.Column(
                "shipping_state",
                sa.String(length=100),
                nullable=True,
            )
        )

        batch_op.add_column(
            sa.Column(
                "shipping_country",
                sa.String(length=100),
                nullable=False,
                server_default="India",
            )
        )

        batch_op.add_column(
            sa.Column(
                "shipping_postal_code",
                sa.String(length=20),
                nullable=True,
            )
        )


        # ==============================
        # New Indexes
        # ==============================

        batch_op.create_index(
            "ix_customers_billing_city",
            ["billing_city"],
            unique=False,
        )

        batch_op.create_index(
            "ix_customers_billing_state",
            ["billing_state"],
            unique=False,
        )

        batch_op.create_index(
            "ix_customers_shipping_city",
            ["shipping_city"],
            unique=False,
        )

        batch_op.create_index(
            "ix_customers_shipping_state",
            ["shipping_state"],
            unique=False,
        )


def downgrade():

    with op.batch_alter_table(
        "customers",
        schema=None
    ) as batch_op:

        batch_op.drop_index(
            "ix_customers_shipping_state"
        )

        batch_op.drop_index(
            "ix_customers_shipping_city"
        )

        batch_op.drop_index(
            "ix_customers_billing_state"
        )

        batch_op.drop_index(
            "ix_customers_billing_city"
        )


        batch_op.drop_column(
            "shipping_postal_code"
        )

        batch_op.drop_column(
            "shipping_country"
        )

        batch_op.drop_column(
            "shipping_state"
        )

        batch_op.drop_column(
            "shipping_city"
        )

        batch_op.drop_column(
            "shipping_address_line_2"
        )

        batch_op.drop_column(
            "shipping_address_line_1"
        )


        batch_op.drop_column(
            "billing_postal_code"
        )

        batch_op.drop_column(
            "billing_country"
        )

        batch_op.drop_column(
            "billing_state"
        )

        batch_op.drop_column(
            "billing_city"
        )

        batch_op.drop_column(
            "billing_address_line_2"
        )

        batch_op.drop_column(
            "billing_address_line_1"
        )