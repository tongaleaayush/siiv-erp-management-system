from sqlalchemy import func, asc, desc

from app.core.extensions import db
from app.core.query.search import Search
from app.core.query.filtering import Filter


class QueryBuilder:
    def __init__(self, query, model):
        self.query = query
        self.model = model

    def search(
        self,
        *,
        search: str | None,
        columns: list,
    ):
        if search:
            self.query = Search.apply(
                query=self.query,
                search=search,
                columns=columns,
            )

        return self

    def filter(
        self,
        *,
        filters: dict,
    ):
        self.query = Filter.apply(
            query=self.query,
            filters=filters,
        )

        return self

    def sort(
        self,
        *,
        sort_by: str | None = None,
        sort_order: str = "asc",
        default_sort: str = "id",
        allowed_fields: set[str] | None = None,
    ):
        column_name = sort_by or default_sort

        # Security: allow only approved columns
        if allowed_fields and column_name not in allowed_fields:
            column_name = default_sort

        column = getattr(
            self.model,
            column_name,
            None,
        )

        # Safety fallback
        if column is None:
            column = getattr(
                self.model,
                default_sort,
            )

        if sort_order.lower() == "desc":
            self.query = self.query.order_by(
                desc(column)
            )
        else:
            self.query = self.query.order_by(
                asc(column)
            )

        return self

    def paginate(
        self,
        *,
        page: int,
        per_page: int,
    ):
        offset = (page - 1) * per_page

        self.query = (
            self.query
            .offset(offset)
            .limit(per_page)
        )

        return self

    def count(self) -> int:
        count_query = (
            db.select(func.count())
            .select_from(
                self.query.subquery()
            )
        )

        return db.session.scalar(count_query)

    def build(self):
        return self.query