from typing import Literal

from models.convocacao_exames_geral import ConvocacaoDeExamesGeralModel
from repositories.repositories import Repositories
from schemas.responses.convocacao_exames_geral import (
    ConvocacaoDeExamesGeralResponse,
)
from schemas.responses.shared import PaginatedResponse, PaginatedResponseMeta


class ConvocacaoExamesGeralService:
    """
    Service class for Convocacao Exames Geral operations.
    """

    def __init__(self, repositories: Repositories):
        self._repository = repositories.convocacao_exames_geral

    def to_response(
        self, record: ConvocacaoDeExamesGeralModel
    ) -> ConvocacaoDeExamesGeralResponse:
        """
        Convert a ConvocacaoDeExamesGeralModel instance to a dictionary response.
        """
        return ConvocacaoDeExamesGeralResponse(**record.model_dump())

    def to_paginated_response(
        self,
        total: int,
        records: list[ConvocacaoDeExamesGeralModel],
        page: int,
        size: int,
    ) -> PaginatedResponse[ConvocacaoDeExamesGeralResponse]:
        """
        Convert a list of ConvocacaoDeExamesGeralModel instances to a paginated response dictionary.
        """
        meta = PaginatedResponseMeta(
            total=total,
            next_page=page + 1 if (page + 1) * size < total else None,
            previous_page=page - 1 if page > 1 else None,
        )

        return PaginatedResponse[ConvocacaoDeExamesGeralResponse](
            count=len(records),
            meta=meta,
            results=[self.to_response(record) for record in records],
        )

    def list(
        self,
        page: int,
        size: int,
        sort_by: str,
        sort_order: Literal["asc", "desc"],
        **kwargs,
    ) -> PaginatedResponse[ConvocacaoDeExamesGeralResponse]:
        """
        List Convocacao Exames Geral records with pagination and filtering.
        """
        records, total = self._repository.filter(
            limit=size,
            offset=(page - 1) * size,
            order_by=sort_by,
            sort_order=sort_order,
            **kwargs,
        )

        return self.to_paginated_response(total, records, page, size)
