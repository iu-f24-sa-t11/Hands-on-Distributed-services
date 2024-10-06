from fastapi import FastAPI

from common.lifespan import lifespan
from services.auth.config import SERVICE_ROOT_PATH
from services.auth.routes import router

app = FastAPI(root_path=SERVICE_ROOT_PATH, lifespan=lifespan)

app.include_router(router)
