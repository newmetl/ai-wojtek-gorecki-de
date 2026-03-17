FROM python:3.12-slim
RUN apt-get update && apt-get install -y docker.io git && rm -rf /var/lib/apt/lists/*
RUN pip install fastapi uvicorn
WORKDIR /srv/deploy-service
COPY server.py .
COPY scripts/ ./scripts/
RUN chmod +x ./scripts/*.sh
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8080"]
