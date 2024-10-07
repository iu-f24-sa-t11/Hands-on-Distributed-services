from fastapi import APIRouter

from common.schemas.message import MessageDTO
from services.feed.service import FeedService

router = APIRouter()

@router.get("/", response_model=list[MessageDTO])
async def get_feed():
    return await FeedService.get_feed()
