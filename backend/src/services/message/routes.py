from fastapi import APIRouter

from common.schemas.message import MessageDTO
from services.message.schemas import CreateMessageDTO
from services.message.service import MessageService

router = APIRouter()


@router.post("/", response_model=MessageDTO)
async def create_message(data: CreateMessageDTO):
    message = await MessageService.create(
        content=data.content, author_username=data.author_username
    )

    return message
