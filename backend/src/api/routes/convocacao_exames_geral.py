from typing import Any

from fastapi import APIRouter, Request
from core.builder import ContainerDep
from schemas.requests.convocacao_exames_geral import (
    ConvocacaoExamesGeralListQueryParams,
)

router = APIRouter()


@router.get("")
async def list_convocacao_exames_geral(request: Request, container: ContainerDep):
    """
    List Convocacao Exames Geral records with optional filtering and pagination.
    """
    query_params: dict[str, Any] = dict(request.query_params)
    params = ConvocacaoExamesGeralListQueryParams(**query_params)

    service = container.app.services.convocacao_exames_geral
    paginated_response = service.list(
        page=params.page,
        size=params.size,
        sort_by=params.sort_by,
        sort_order=params.sort_order,
        **params.model_dump(
            exclude_none=True,
            exclude={"page", "size", "sort_by", "sort_order"},
        ),
    )

    return paginated_response
