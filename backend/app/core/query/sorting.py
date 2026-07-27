from sqlalchemy import Select


class Sorting:
    @staticmethod
    def apply(
        query: Select,
        model,
        sort_by: str | None,
        sort_order: str = "asc",
        default_sort: str = "id",
    ) -> Select:
        column_name = sort_by or default_sort

        if not hasattr(model, column_name):
            column_name = default_sort

        column = getattr(model, column_name)

        if sort_order.lower() == "desc":
            return query.order_by(column.desc())

        return query.order_by(column.asc())