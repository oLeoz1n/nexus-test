from typing import Literal

from sqlmodel import Session, func, select
from models.base_geral import BaseGeralModel
from repositories.base_geral_repository import BaseGeralRepository
from utils.database import build_filter_conditions


class DatabaseBaseGeralRepository(BaseGeralRepository):
    """BaseGeral database data repository."""

    def __init__(self, session: Session) -> None:
        self._session = session

    def filter(
        self,
        *,
        limit: int,
        offset: int,
        order_by: str,
        sort_order: Literal["asc", "desc"],
        **kwargs,
    ) -> tuple[list[BaseGeralModel], int]:
        filters = build_filter_conditions(BaseGeralModel, kwargs)

        statement = (
            select(BaseGeralModel)
            .filter(*filters)
            .order_by(getattr(getattr(BaseGeralModel, order_by), sort_order)())
            .offset(offset)
            .limit(limit)
        )

        total = self._session.exec(
            select(func.count()).select_from(BaseGeralModel).filter(*filters)
        ).one()

        return list(self._session.exec(statement).all()), total
