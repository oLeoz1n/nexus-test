from sqlmodel import Session, func, select
from models.convocacao_exames_geral import ConvocacaoDeExamesGeralModel
from repositories.convocacao_exames_geral_repository import (
    ConvocacaoExamesGeralRepository,
)
from utils.database import build_filter_conditions


class DatabaseConvocacaoExamesGeralRepository(ConvocacaoExamesGeralRepository):
    """ConvocacaoExamesGeral database data repository."""

    def __init__(self, session: Session) -> None:
        self._session = session

    def filter(
        self,
        *,
        limit: int,
        offset: int,
        order_by: str,
        sort_order: str,
        **kwargs,
    ) -> tuple[list[ConvocacaoDeExamesGeralModel], int]:
        filters = build_filter_conditions(ConvocacaoDeExamesGeralModel, kwargs)

        statement = (
            select(
                *ConvocacaoDeExamesGeralModel.real_cols(),
            )
            .filter(*filters)
            .order_by(
                getattr(getattr(ConvocacaoDeExamesGeralModel, order_by), sort_order)()
            )
            .offset(offset)
            .limit(limit)
        )
        total = self._session.exec(
            select(func.count())
            .select_from(ConvocacaoDeExamesGeralModel)
            .filter(*filters)
        ).one()

        results = self._session.exec(statement).all()

        return [
            ConvocacaoDeExamesGeralModel(**item._mapping) for item in results
        ], total
