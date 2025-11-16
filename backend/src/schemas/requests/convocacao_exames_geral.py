from datetime import date
from typing import Literal, Optional

from pydantic import BaseModel, Field


class ConvocacaoExamesGeralListQueryParams(BaseModel):
    page: int = Field(default=1, ge=1, description="Número da página para paginação")
    size: int = Field(
        default=10, ge=1, description="Número de itens por página para paginação"
    )
    sort_by: Literal["matricula", "dt_admissao"] = Field(
        default="matricula", description="Campo para ordenação dos resultados"
    )
    sort_order: Literal["asc", "desc"] = Field(
        default="asc", description="Ordem de ordenação: 'asc' ou 'desc'"
    )
    cargo: Optional[str] = Field(
        default=None, description="Cargo para filtro específico"
    )
    nome__contains: Optional[str] = Field(
        default=None, description="Nome do colaborador para filtro específico"
    )
    matricula: Optional[str] = Field(
        default=None, description="Matrícula para filtro específico"
    )
    dt_admissao__gte: Optional[date] = Field(
        default=None,
        description="Data de admissão inicial no formato AAAA-MM-DD para filtro de intervalo",
    )
    dt_admissao__lte: Optional[date] = Field(
        default=None,
        description="Data de admissão final no formato AAAA-MM-DD para filtro de intervalo",
    )
    situacao: Optional[str] = Field(
        default=None, description="Situação do colaborador para filtro específico"
    )
    dt_nascimento__gte: Optional[date] = Field(
        default=None,
        description="Data de nascimento inicial no formato AAAA-MM-DD para filtro de intervalo",
    )
    dt_nascimento__lte: Optional[date] = Field(
        default=None,
        description="Data de nascimento final no formato AAAA-MM-DD para filtro de intervalo",
    )
