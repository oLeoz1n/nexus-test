from datetime import date
from typing import Optional

from sqlmodel import Field, SQLModel


class ConvocacaoDeExamesGeralModel(SQLModel, table=True):
    __tablename__ = "convocacao_de_exames_geral"  # type: ignore
    __table_args__ = {"schema": "relacionamento_teste"}

    # fake primary key to satisfy SQLModel requirements
    id: Optional[int] = Field(default=None, primary_key=True)

    cargo: Optional[str] = None
    nome: Optional[str] = None
    matricula: Optional[str] = None
    exame: Optional[str] = None
    ultimo_pedido: Optional[str] = None
    data_resultado: Optional[date] = None
    periodicidade: Optional[int] = None
    refazer_em: Optional[str] = None
    dt_admissao: Optional[date] = None
    situacao: Optional[str] = None
    cidade_unidade: Optional[str] = None
    estado_unidade: Optional[str] = None
    dt_nascimento: Optional[date] = None
    data_referencia: Optional[date] = None

    @staticmethod
    def real_cols():
        """
        Returns all real columns (non PK) of the model.
        """

        table = ConvocacaoDeExamesGeralModel.__table__  # type: ignore
        names = [col.name for col in table.columns if not col.primary_key]
        return tuple(getattr(ConvocacaoDeExamesGeralModel, name) for name in names)
