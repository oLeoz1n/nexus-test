from abc import ABC, abstractmethod

from models.base_geral import BaseGeralModel
from typing_extensions import Literal


class BaseGeralRepository(ABC):
    @abstractmethod
    def filter(
        self,
        *,
        limit: int,
        offset: int,
        order_by: str,
        sort_order: Literal["asc", "desc"],
        **kwargs,
    ) -> tuple[list[BaseGeralModel], int]:
        pass
