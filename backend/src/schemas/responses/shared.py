from typing import Generic, TypeVar

from pydantic import BaseModel

T = TypeVar("T")


class PaginatedResponseMeta(BaseModel):
    next_page: int | None = None
    previous_page: int | None = None
    total: int


class PaginatedResponse(Generic[T], BaseModel):
    count: int
    results: list[T]
    meta: PaginatedResponseMeta
