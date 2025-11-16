from datetime import date
from typing import Optional

from sqlmodel import Field, SQLModel


class BaseGeralModel(SQLModel, table=True):
    __tablename__ = "base_geral"  # type: ignore
    __table_args__ = {"schema": "central_teste"}

    id: Optional[int] = Field(default=None, primary_key=True)
    ticket: Optional[int] = None
    solicitante: Optional[str] = None
    data_solicitacao: Optional[date] = None
    etapa_atual: Optional[str] = None
    status: Optional[str] = None
    nome_colaborador: Optional[str] = None
    tipo_exame: Optional[str] = None
    data_exame: Optional[date] = None
    cidade_preferencia: Optional[str] = None
    agendar_enquadramento_pcd: Optional[str] = None
    possui_formulario_rac: Optional[str] = None
    possui_exames_complementares: Optional[str] = None
    data_conclusao_dia: Optional[date] = None
    status_sla_agendamento: Optional[str] = None
    data_ultima_alteracao: Optional[date] = None
    dados_agendamento_tipo_solicitacao: Optional[str] = None
