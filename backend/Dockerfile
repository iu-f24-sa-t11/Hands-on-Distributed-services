FROM python:3.12 AS base

COPY ./requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir -r /app/requirements.txt

COPY ./src /app/src

WORKDIR /app/src

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--proxy-headers"]

FROM base AS auth-service

COPY ./src/services/auth/app.py /app/src/main.py

FROM base AS feed-service

COPY ./src/services/feed/app.py /app/src/main.py

FROM base AS like-service

COPY ./src/services/like/app.py /app/src/main.py

FROM base AS message-service

COPY ./src/services/message/app.py /app/src/main.py
