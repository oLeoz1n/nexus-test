from fastapi import Request, status
from fastapi.responses import JSONResponse
from pydantic_core import ValidationError


async def pydantic_validation_exception_handler(request: Request, exc: ValidationError):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"detail": exc.errors()},
    )
