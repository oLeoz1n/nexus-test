from typing import Type

from pydantic import BaseModel

OPERATORS = {
    "eq": lambda col, v: col == v,
    "ne": lambda col, v: col != v,
    "gt": lambda col, v: col > v,
    "gte": lambda col, v: col >= v,
    "lt": lambda col, v: col < v,
    "lte": lambda col, v: col <= v,
    "in": lambda col, v: col.in_(v if isinstance(v, list) else [v]),
    "contains": lambda col, v: col.ilike(f"%{v}%"),
}


def build_filter_conditions(model: Type[BaseModel], filters: dict):
    conditions = []

    for field, value in filters.items():
        if value is None:
            continue

        if "__" in field:
            field_name, operator = field.split("__", 1)
        else:
            field_name = field
            operator = "eq"

        if operator not in OPERATORS:
            raise ValueError(
                f"Operador '{operator}' inválido. Operadores válidos: {list(OPERATORS.keys())}"
            )

        column = getattr(model, field_name, None)

        if column is None:
            raise ValueError(
                f"Campo '{field_name}' não existe no modelo {model.__name__}"
            )

        conditions.append(OPERATORS[operator](column, value))

    return conditions
