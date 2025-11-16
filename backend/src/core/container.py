from typing import NamedTuple

from repositories.repositories import Repositories
from services.services import Services


class Infra(NamedTuple):
    repositories: Repositories


class Application(NamedTuple):
    services: Services


class ContainerOptions(NamedTuple):
    infra: Infra
    app: Application


class Container:
    _infra: Infra
    _app: Application

    def __init__(self, options: ContainerOptions):
        self._infra = options.infra
        self._app = options.app

    @property
    def infra(self) -> Infra:
        return self._infra

    @property
    def app(self) -> Application:
        return self._app
