FROM python:3.11.1-slim-buster

ENV  POETRY_VIRTUALENVS_CREATE=false

WORKDIR /usr/src/app

RUN pip install poetry

COPY poetry.lock pyproject.toml /usr/src/app/

RUN poetry install

COPY ./ /usr/src/app/

CMD ["uvicorn", "app.main:main", "--host", "0.0.0.0", "--port", "8001", "--reload"]
# CMD ["python","app/main.py"]
