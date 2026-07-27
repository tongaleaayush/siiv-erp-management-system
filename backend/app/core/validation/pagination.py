class PaginationValidator:

    DEFAULT_PAGE = 1
    DEFAULT_PER_PAGE = 10

    MAX_PER_PAGE = 100


    @staticmethod
    def validate(
        page: int,
        per_page: int,
    ):

        if page < 1:
            raise ValueError(
                "Page must be greater than 0."
            )


        if per_page < 1:
            raise ValueError(
                "Per page must be greater than 0."
            )


        if per_page > PaginationValidator.MAX_PER_PAGE:
            raise ValueError(
                "Per page cannot exceed 100."
            )


        return page, per_page