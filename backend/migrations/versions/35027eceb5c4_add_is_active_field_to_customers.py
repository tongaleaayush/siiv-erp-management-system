"""add is active field to customers

Revision ID: 35027eceb5c4
Revises: 7f26952c3fb9
Create Date: 2026-07-31 13:02:12.122467

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '35027eceb5c4'
down_revision = '7f26952c3fb9'
branch_labels = None
depends_on = None


def upgrade():

    with op.batch_alter_table('customers', schema=None) as batch_op:

        batch_op.add_column(
            sa.Column(
                'is_active',
                sa.Boolean(),
                nullable=False,
                server_default=sa.text('true')
            )
        )

        batch_op.create_index(
            batch_op.f('ix_customers_is_active'),
            ['is_active'],
            unique=False
        )


def downgrade():

    with op.batch_alter_table('customers', schema=None) as batch_op:

        batch_op.drop_index(
            batch_op.f('ix_customers_is_active')
        )

        batch_op.drop_column(
            'is_active'
        )