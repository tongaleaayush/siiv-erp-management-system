class SortingValidator:

    ALLOWED_SORT_FIELDS = {
        "id",
        "customer_code",
        "name",
        "email",
        "created_at",
    }


    ALLOWED_SORT_ORDER = {
        "asc",
        "desc",
    }


    @staticmethod
    def validate(
        sort_by: str | None,
        sort_order: str,
    ):

        if sort_by:

            if sort_by not in SortingValidator.ALLOWED_SORT_FIELDS:
                raise ValueError(
                    f"Sorting by '{sort_by}' is not allowed."
                )


        if sort_order.lower() not in SortingValidator.ALLOWED_SORT_ORDER:

            raise ValueError(
                "Sort order must be either 'asc' or 'desc'."
            )


        return sort_by, sort_order.lower()