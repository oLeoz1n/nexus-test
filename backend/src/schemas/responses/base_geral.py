from datetime import date
from typing import Optional

from pydantic import BaseModel, Field


class BaseGeralResponse(BaseModel):
    id: int = Field(..., description="ID único do registro")
    ticket: Optional[int] = Field(..., description="Número do ticket associado")
    solicitante: Optional[str] = Field(..., description="Nome do solicitante")
    data_solicitacao: Optional[date] = Field(
        ..., description="Data da solicitação no formato AAAA-MM-DD"
    )
    etapa_atual: Optional[str] = Field(..., description="Etapa atual do processo")
    status: Optional[str] = Field(..., description="Status atual do processo")
    nome_colaborador: Optional[str] = Field(..., description="Nome do colaborador")
    tipo_exame: Optional[str] = Field(..., description="Tipo de exame solicitado")
    data_exame: Optional[date] = Field(
        ..., description="Data do exame no formato AAAA-MM-DD"
    )
    cidade_preferencia: Optional[str] = Field(
        ..., description="Cidade de preferência para o exame"
    )
    agendar_enquadramento_pcd: Optional[str] = Field(
        ..., description="Indicação de agendamento para enquadramento PCD"
    )
    possui_formulario_rac: Optional[str] = Field(
        ..., description="Indicação de posse do formulário RAC"
    )
    possui_exames_complementares: Optional[str] = Field(
        ..., description="Indicação de posse de exames complementares"
    )
    data_conclusao_dia: Optional[date] = Field(
        ..., description="Data de conclusão no formato AAAA-MM-DD"
    )
    status_sla_agendamento: Optional[str] = Field(
        ..., description="Status do SLA de agendamento"
    )
    data_ultima_alteracao: Optional[date] = Field(
        ..., description="Data da última alteração no formato AAAA-MM-DD"
    )
    dados_agendamento_tipo_solicitacao: Optional[str] = Field(
        ..., description="Tipo de solicitação para dados de agendamento"
    )

    class Config:
        orm_mode = True
