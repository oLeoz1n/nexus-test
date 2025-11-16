from typing import NamedTuple

from services.base_geral import BaseGeralService
from services.convocacao_exames_geral import ConvocacaoExamesGeralService


class Services(NamedTuple):
    convocacao_exames_geral: ConvocacaoExamesGeralService
    base_geral: BaseGeralService
