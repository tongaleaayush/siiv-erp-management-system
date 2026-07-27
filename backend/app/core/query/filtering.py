from sqlalchemy import and_


class Filter:

    OPERATORS = {
        "eq",
        "ne",
        "gt",
        "gte",
        "lt",
        "lte",
        "contains",
        "starts_with",
        "in",
    }


    @staticmethod
    def apply(
        query,
        filters: dict,
    ):

        conditions = []


        for column, value in filters.items():

            if value is None:
                continue


            if isinstance(column, tuple):

                column, operator = column

            else:

                operator = "eq"


            if operator not in Filter.OPERATORS:
                continue



            if operator == "eq":

                conditions.append(
                    column == value
                )


            elif operator == "ne":

                conditions.append(
                    column != value
                )


            elif operator == "gt":

                conditions.append(
                    column > value
                )


            elif operator == "gte":

                conditions.append(
                    column >= value
                )


            elif operator == "lt":

                conditions.append(
                    column < value
                )


            elif operator == "lte":

                conditions.append(
                    column <= value
                )


            elif operator == "contains":

                conditions.append(
                    column.ilike(
                        f"%{value}%"
                    )
                )


            elif operator == "starts_with":

                conditions.append(
                    column.ilike(
                        f"{value}%"
                    )
                )


            elif operator == "in":

                values = (
                    value.split(",")
                    if isinstance(value, str)
                    else value
                )

                conditions.append(
                    column.in_(values)
                )



        if conditions:

            query = query.where(
                and_(*conditions)
            )


        return query