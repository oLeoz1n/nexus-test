from typing import NamedTuple

from repositories.base_geral_repository import BaseGeralRepository
from repositories.convocacao_exames_geral_repository import (
    ConvocacaoExamesGeralRepository,
)


class Repositories(NamedTuple):
    convocacao_exames_geral: ConvocacaoExamesGeralRepository
    base_geral: BaseGeralRepository
