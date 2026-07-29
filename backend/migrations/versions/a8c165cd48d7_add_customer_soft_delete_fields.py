"""add customer soft delete fields

Revision ID: a8c165cd48d7
Revises: 38596741aae4
Create Date: 2026-07-28 15:32:14.295025

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "a8c165cd48d7"
down_revision = "38596741aae4"
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table("customers", schema=None) as batch_op:

        # Soft delete flag
        batch_op.add_column(
            sa.Column(
                "is_deleted",
                sa.Boolean(),
                nullable=False,
                server_default=sa.false(),
            )
        )

        # User who deleted the customer
        batch_op.add_column(
            sa.Column(
                "deleted_by",
                sa.Integer(),
                nullable=True,
            )
        )

        # Index for faster filtering
        batch_op.create_index(
            "ix_customers_is_deleted",
            ["is_deleted"],
            unique=False,
        )

        # Foreign key to users table
        batch_op.create_foreign_key(
            "fk_customers_deleted_by_users",
            "users",
            ["deleted_by"],
            ["id"],
        )


    # Remove database default after existing rows are updated
    # Future values will be handled by SQLAlchemy model default
    with op.batch_alter_table("customers", schema=None) as batch_op:

        batch_op.alter_column(
            "is_deleted",
            server_default=None,
        )


def downgrade():

    with op.batch_alter_table("customers", schema=None) as batch_op:

        batch_op.drop_constraint(
            "fk_customers_deleted_by_users",
            type_="foreignkey",
        )

        batch_op.drop_index(
            "ix_customers_is_deleted"
        )

        batch_op.drop_column(
            "deleted_by"
        )

        batch_op.drop_column(
            "is_deleted"
        )