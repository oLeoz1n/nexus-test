# nexus-test

## Stack de Tecnologias

### Backend

-   FastAPI 0.121
-   SQLModel 0.0.27
-   python-dotenv
-   Pydantic v2 + pydantic-settings
-   PostgreSQL (driver `psycopg2`)
-   Uvicorn (ASGI server)

### Frontend

-   React 19 + React Router 7
-   TypeScript 5 + Vite 7
-   TanStack Query 5
-   Tailwind CSS 4 (com `@tailwindcss/vite`)
-   Ícones: lucide-react

## Requisitos

-   Python >= 3.11.9
-   Pip >= 23.0.1
-   Node.js >= 20.19
-   npm >= 10.8.2
-   Banco PostgreSQL acessível (local ou remoto)

## Variáveis de Ambiente

Crie os arquivos de ambiente a partir dos exemplos fornecidos:

-   Backend (`backend/.env`):

    -   Exemplo: ver `backend/env.example`
    -   Obrigatória: `POSTGRES_URL` (ex.: `postgresql://postgres:password@localhost:5432/postgres`)

-   Frontend (`frontend/.env`):
    -   Exemplo: ver `frontend/env.example`
    -   `VITE_API_BASE_URL` (padrão usado no código: `http://localhost:8000`)

## Como Rodar Localmente

### Backend

1. Criar e ativar o ambiente virtual e instalar dependências

Windows (PowerShell):

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements/requirements.txt
```

Linux / macOS (bash/zsh):

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements/requirements.txt
```

2. Configurar o `.env` do backend

-   Copie `backend/env.example` para `backend/.env` e ajuste `POSTGRES_URL`.

3. Executar o servidor FastAPI

```bash
cd src
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

-   Swagger/OpenAPI: `http://localhost:8000/docs`
-   Redoc: `http://localhost:8000/redoc`

### Frontend

1. Instalar dependências e configurar `.env`

```bash
cd frontend
npm install
```

2. Rodar em desenvolvimento

```bash
npm run dev
```

-   App: `http://localhost:5173`

## Endpoints do Backend

Base path da API: `http://localhost:8000/api`

### Saúde (hello)

-   Método/Path: `GET /`
-   Descrição: endpoint simples de verificação retornando `{"message": "Hello, World!"}`.

### Base Geral

-   Método/Path: `GET /api/base-geral`
-   Descrição: lista registros de Base Geral com filtros, ordenação e paginação.
-   Query params principais:
    -   `page` (int, default 1)
    -   `size` (int, default 10)
    -   `sort_by` (`id` | `ticket` | `data_solicitacao`, default `id`)
    -   `sort_order` (`asc` | `desc`, default `asc`)
    -   `ticket` (int)
    -   `etapa_atual` (str)
    -   `data_solicitacao__gte` (date `AAAA-MM-DD`)
    -   `data_solicitacao__lte` (date `AAAA-MM-DD`)
    -   `solicitante__contains` (str)
    -   `status` (str)
    -   `nome_colaborador__contains` (str)
    -   `tipo_exame` (str)
-   Resposta (200): `PaginatedResponse<BaseGeralResponse>`
    -   Forma: `{ "count": number, "results": BaseGeralResponse[], "meta": { "total": number, "next_page": number|null, "previous_page": number|null } }`

Exemplo:

```http
GET http://localhost:8000/api/base-geral?page=1&size=10&sort_by=id&sort_order=asc
Accept: application/json
```

### Convocação de Exames (Geral)

-   Método/Path: `GET /api/convocacao-exames-geral`
-   Descrição: lista registros com filtros, ordenação e paginação.
-   Query params principais:
    -   `page` (int, default 1)
    -   `size` (int, default 10)
    -   `sort_by` (`matricula` | `dt_admissao`, default `matricula`)
    -   `sort_order` (`asc` | `desc`, default `asc`)
    -   `cargo` (str)
    -   `nome__contains` (str)
    -   `matricula` (str)
    -   `dt_admissao__gte` (date `AAAA-MM-DD`)
    -   `dt_admissao__lte` (date `AAAA-MM-DD`)
    -   `situacao` (str)
    -   `dt_nascimento_gte` (date `AAAA-MM-DD`)
    -   `dt_nascimento_lte` (date `AAAA-MM-DD`)
-   Resposta (200): `PaginatedResponse<ConvocacaoDeExamesGeralResponse>`

Exemplo:

```http
GET http://localhost:8000/api/convocacao-exames-geral?page=1&size=10&sort_by=matricula&sort_order=desc
Accept: application/json
```
