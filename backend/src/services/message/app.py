from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from common.exceptions.exception import (
    ApplicationException,
    application_exception_handler,
)
from common.lifespan import lifespan
from services.message.config import SERVICE_ROOT_PATH
from services.message.routes import router

app = FastAPI(root_path=SERVICE_ROOT_PATH, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.add_exception_handler(ApplicationException, application_exception_handler)
