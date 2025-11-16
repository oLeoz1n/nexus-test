import logging

from fastapi import APIRouter

from .routes import base_geral, convocacao_exames_geral

logger = logging.getLogger(__name__)

api_router = APIRouter()
api_router.include_router(base_geral.router, prefix="/base-geral", tags=["base-geral"])
api_router.include_router(
    convocacao_exames_geral.router,
    prefix="/convocacao-exames-geral",
    tags=["convocacao-exames-geral"],
)
