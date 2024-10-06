from fastapi import APIRouter, Response

from services.auth.schemas import UsernameDTO
from services.auth.service import AuthService

router = APIRouter()


@router.post("/register", status_code=201)
async def register(data: UsernameDTO):
    await AuthService.register(data.username)

    return Response(status_code=201)


@router.post("/login", status_code=200)
async def login(data: UsernameDTO):
    await AuthService.login(data.username)

    return Response(status_code=200)
