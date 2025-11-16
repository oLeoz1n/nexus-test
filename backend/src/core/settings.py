from pathlib import Path

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

# Carrega as envs do arquivo .env que está na raiz do backend
load_dotenv(
    dotenv_path=Path(__file__).resolve().parent.parent.parent / ".env", override=False
)


class Settings(BaseSettings):
    """Application settings."""

    POSTGRES_URL: str = "postgresql://postgres:password@localhost:5432/postgres"


settings = Settings()
