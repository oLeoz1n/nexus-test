from typing import Annotated

from fastapi import Depends
from core.container import Application, Container, ContainerOptions, Infra
from core.database import SessionDep
from repositories.base_geral.database.repository import DatabaseBaseGeralRepository
from repositories.convocacao_exames_geral.database.repository import (
    DatabaseConvocacaoExamesGeralRepository,
)
from repositories.repositories import Repositories
from services.base_geral import BaseGeralService
from services.convocacao_exames_geral import ConvocacaoExamesGeralService
from services.services import Services


class Builder:
    _session: SessionDep
    _infra: Infra
    _application: Application

    def __init__(self, session: SessionDep):
        self._session = session

    def _build_infra(self) -> Infra:
        return Infra(
            repositories=Repositories(
                base_geral=DatabaseBaseGeralRepository(self._session),
                convocacao_exames_geral=DatabaseConvocacaoExamesGeralRepository(
                    self._session
                ),
            )
        )

    def _build_application(self) -> Application:
        return Application(
            services=Services(
                base_geral=BaseGeralService(repositories=self._infra.repositories),
                convocacao_exames_geral=ConvocacaoExamesGeralService(
                    repositories=self._infra.repositories
                ),
            )
        )

    def build(self) -> Container:
        self._infra = self._build_infra()
        self._application = self._build_application()
        return Container(
            options=ContainerOptions(infra=self._infra, app=self._application)
        )


def get_container(session: SessionDep) -> Container:
    """FastAPI dependency to build and return the Container per request."""
    return Builder(session).build()


ContainerDep = Annotated[Container, Depends(get_container)]
