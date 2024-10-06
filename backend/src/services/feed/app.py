from fastapi import FastAPI

from common.lifespan import lifespan
from services.feed.config import SERVICE_ROOT_PATH
from services.feed.routes import router

app = FastAPI(root_path=SERVICE_ROOT_PATH, lifespan=lifespan)

app.include_router(router)
