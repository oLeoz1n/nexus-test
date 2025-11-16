from datetime import date
from typing import Literal, Optional

from pydantic import BaseModel, Field


class BaseGeralListQueryParams(BaseModel):
    page: int = Field(default=1, ge=1, description="Número da página para paginação")
    size: int = Field(
        default=10, ge=1, description="Número de itens por página para paginação"
    )
    sort_by: Literal["id", "ticket", "data_solicitacao"] = Field(
        default="id", description="Campo para ordenação dos resultados"
    )
    sort_order: Literal["asc", "desc"] = Field(
        default="asc", description="Ordem de ordenação: 'asc' ou 'desc'"
    )
    ticket: Optional[int] = Field(
        default=None, description="Número do ticket para filtro específico"
    )
    etapa_atual: Optional[str] = Field(
        default=None, description="Etapa atual do processo para filtro específico"
    )
    data_solicitacao__gte: Optional[date] = Field(
        default=None,
        description="Data inicial da solicitação no formato AAAA-MM-DD para filtro de intervalo",
    )
    data_solicitacao__lte: Optional[date] = Field(
        default=None,
        description="Data final da solicitação no formato AAAA-MM-DD para filtro de intervalo",
    )
    solicitante: Optional[str] = Field(
        default=None, description="Nome do solicitante para filtro específico"
    )
    status: Optional[str] = Field(
        default=None, description="Status do processo para filtro específico"
    )
    nome_colaborador: Optional[str] = Field(
        default=None, description="Nome do colaborador para filtro específico"
    )
    tipo_exame: Optional[str] = Field(
        default=None, description="Tipo de exame para filtro específico"
    )
