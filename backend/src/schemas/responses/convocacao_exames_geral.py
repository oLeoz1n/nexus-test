from datetime import date
from typing import Optional

from pydantic import BaseModel


class ConvocacaoDeExamesGeralResponse(BaseModel):
    cargo: Optional[str]
    nome: Optional[str]
    matricula: Optional[str]
    exame: Optional[str]
    ultimo_pedido: Optional[str]
    data_resultado: Optional[date]
    periodicidade: Optional[int]
    refazer_em: Optional[str]
    dt_admissao: Optional[date]
    situacao: Optional[str]
    cidade_unidade: Optional[str]
    estado_unidade: Optional[str]
    dt_nascimento: Optional[date]
    data_referencia: Optional[date]
