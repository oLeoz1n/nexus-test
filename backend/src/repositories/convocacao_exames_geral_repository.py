from abc import ABC, abstractmethod

from models.convocacao_exames_geral import ConvocacaoDeExamesGeralModel
from typing_extensions import Literal


class ConvocacaoExamesGeralRepository(ABC):
    @abstractmethod
    def filter(
        self,
        *,
        limit: int,
        offset: int,
        order_by: str,
        sort_order: Literal["asc", "desc"],
        **kwargs,
    ) -> tuple[list[ConvocacaoDeExamesGeralModel], int]:
        pass
