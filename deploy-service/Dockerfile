FROM python:3.12-slim
RUN apt-get update && apt-get install -y docker.io git curl && rm -rf /var/lib/apt/lists/*
RUN mkdir -p /usr/local/lib/docker/cli-plugins \
    && curl -SL https://github.com/docker/compose/releases/download/v2.24.6/docker-compose-linux-x86_64 \
       -o /usr/local/lib/docker/cli-plugins/docker-compose \
    && chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
RUN pip install fastapi uvicorn
WORKDIR /srv/deploy-service
COPY server.py .
COPY scripts/ ./scripts/
RUN chmod +x ./scripts/*.sh
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8080"]
