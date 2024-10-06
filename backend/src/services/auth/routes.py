from fastapi import APIRouter, Response

from services.auth.service import AuthService

router = APIRouter()


@router.post("/register", status_code=201)
async def register(username: str):
    await AuthService.register(username)

    return Response(status_code=201)


@router.post("/login", status_code=200)
async def login(username: str):
    await AuthService.login(username)

    return Response(status_code=200)
