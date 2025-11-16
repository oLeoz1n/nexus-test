from typing import Any

from fastapi import APIRouter, Request
from core.builder import ContainerDep
from schemas.requests.base_geral import BaseGeralListQueryParams

router = APIRouter()


@router.get("")
async def list_base_geral(request: Request, container: ContainerDep):
    """
    List Base Geral records with optional filtering and pagination.
    """
    query_params: dict[str, Any] = dict(request.query_params)
    params = BaseGeralListQueryParams(**query_params)

    service = container.app.services.base_geral
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
