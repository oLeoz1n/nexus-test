from typing import Literal

from models.base_geral import BaseGeralModel
from repositories.repositories import Repositories
from schemas.responses.base_geral import BaseGeralResponse
from schemas.responses.shared import PaginatedResponse, PaginatedResponseMeta


class BaseGeralService:
    """
    Service class for Base Geral operations.
    """

    def __init__(self, repositories: Repositories):
        self._repository = repositories.base_geral

    def to_response(self, record: BaseGeralModel) -> BaseGeralResponse:
        """
        Convert a BaseGeralModel instance to a dictionary response.
        """
        return BaseGeralResponse(**record.model_dump())

    def to_paginated_response(
        self, total: int, records: list[BaseGeralModel], page: int, size: int
    ) -> PaginatedResponse[BaseGeralResponse]:
        """
        Convert a list of BaseGeralModel instances to a paginated response dictionary.
        """
        meta = PaginatedResponseMeta(
            total=total,
            next_page=page + 1 if (page + 1) * size < total else None,
            previous_page=page - 1 if page > 1 else None,
        )

        return PaginatedResponse[BaseGeralResponse](
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
    ) -> PaginatedResponse[BaseGeralResponse]:
        """
        List Base Geral records with pagination and filtering.
        """
        records, total = self._repository.filter(
            limit=size,
            offset=(page - 1) * size,
            order_by=sort_by,
            sort_order=sort_order,
            **kwargs,
        )

        return self.to_paginated_response(total, records, page, size)
