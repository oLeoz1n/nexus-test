"""
Main application module
"""

from api.router import api_router
from fastapi import FastAPI
from handlers.exceptions import pydantic_validation_exception_handler
from pydantic_core import ValidationError

app = FastAPI()

app.include_router(prefix="/api", router=api_router)
app.add_exception_handler(ValidationError, pydantic_validation_exception_handler)  # type: ignore


@app.get("/")
async def hello_world():
    return {"message": "Hello, World!"}
