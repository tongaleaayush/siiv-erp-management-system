from sqlalchemy import Select, or_


class Search:
    @staticmethod
    def apply(
        query: Select,
        search: str | None,
        columns: list,
    ) -> Select:
        if not search:
            return query

        pattern = f"%{search}%"

        return query.where(
            or_(
                *[
                    column.ilike(pattern)
                    for column in columns
                ]
            )
        )