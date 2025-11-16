from schemas.responses.shared import PaginatedResponseMeta


def generate_pagination_metadata(
    total: int, page: int, size: int
) -> PaginatedResponseMeta:
    next_page = page + 1 if page * size < total else None
    previous_page = page - 1 if page > 1 else None
    return PaginatedResponseMeta(
        total=total,
        next_page=next_page,
        previous_page=previous_page,
    )


def calculate_offset(page: int, size: int) -> int:
    return (page - 1) * size
