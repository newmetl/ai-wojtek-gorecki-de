from fastapi import FastAPI, Header, HTTPException, BackgroundTasks
import subprocess, os, logging

app = FastAPI()
API_KEY = os.environ["DEPLOY_API_KEY"]
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(message)s")


def _run(script: str):
    logging.info(f"Starting: {script}")
    result = subprocess.run(
        [f"/srv/deploy-service/scripts/{script}"],
        capture_output=True, text=True
    )
    logging.info(result.stdout)
    if result.returncode != 0:
        logging.error(result.stderr)


def _check_key(key: str):
    if key != API_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized")


@app.get("/status")
async def status(x_api_key: str = Header(...)):
    _check_key(x_api_key)
    return {"status": "running"}


@app.post("/deploy/stage")
async def deploy_stage(background_tasks: BackgroundTasks,
                       x_api_key: str = Header(...)):
    _check_key(x_api_key)
    background_tasks.add_task(_run, "deploy-stage.sh")
    return {"status": "started", "env": "stage"}


@app.post("/deploy/prod")
async def deploy_prod(background_tasks: BackgroundTasks,
                      x_api_key: str = Header(...)):
    _check_key(x_api_key)
    background_tasks.add_task(_run, "deploy-prod.sh")
    return {"status": "started", "env": "prod"}
