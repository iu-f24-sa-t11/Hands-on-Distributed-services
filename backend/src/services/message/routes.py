from fastapi import APIRouter, Response

from services.message.schemas import CreateMessageDTO
from services.message.service import MessageService

router = APIRouter()


@router.post("/", status_code=201)
async def create_message(data: CreateMessageDTO):
    await MessageService.create(
        content=data.content, author_username=data.author_username
    )

    return Response(status_code=201)
