from fastapi import APIRouter, Response

from services.like.schemas import LikeDTO
from services.like.service import LikeService

router = APIRouter()


@router.post("/set")
async def set_like(data: LikeDTO):
    await LikeService.set_like(message_id=data.message_id, username=data.username)

    return Response(status_code=200)


@router.post("/unset")
async def unset_like(data: LikeDTO):
    await LikeService.unset_like(message_id=data.message_id, username=data.username)

    return Response(status_code=200)
