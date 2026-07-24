from sqlalchemy import Select


class Pagination:
    @staticmethod
    def apply(
        query: Select,
        page: int,
        per_page: int,
    ) -> Select:
        offset = (page - 1) * per_page

        return (
            query
            .offset(offset)
            .limit(per_page)
        )