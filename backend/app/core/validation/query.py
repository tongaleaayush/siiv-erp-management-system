from app.core.validation.pagination import PaginationValidator
from app.core.validation.sorting import SortingValidator


class QueryValidator:


    @staticmethod
    def validate(
        *,
        page: int,
        per_page: int,
        sort_by: str | None,
        sort_order: str,
    ):

        PaginationValidator.validate(
            page=page,
            per_page=per_page,
        )


        SortingValidator.validate(
            sort_by=sort_by,
            sort_order=sort_order,
        )


        return True