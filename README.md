# nexus-test

### Requisitos:

-   Python >= 3.11.9
-   Pip >= 23.0.1
-   Node.js >= v18.20.8
-   npm >= 10.8.2

### Rodar o backend:

-   Instalar dependências e criar ambiente virtual:

### Linux / MacOS

```bash
cd ./backend/src
python3 -m venv venv
source venv/bin/activate
pip install -r ./requirements/requirements.txt
```

### Windows

```bash
cd ./backend/src
python -m venv venv
venv\Scripts\activate
pip install -r ./requirements/requirements.txt
```

-   Preencher as variáveis de ambiente no arquivo `.env` na raiz do diretório `backend`

-   Rodar o servidor:

```bash
uvicorn main:app
```
