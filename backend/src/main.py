"""
Main application module
"""

from api.router import api_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from handlers.exceptions import pydantic_validation_exception_handler
from pydantic_core import ValidationError

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prefix="/api", router=api_router)
app.add_exception_handler(ValidationError, pydantic_validation_exception_handler)  # type: ignore


@app.get("/")
async def hello_world():
    return {"message": "Hello, World!"}
