from common.database.repositories.message import MessageRepository
from common.schemas.message import MessageDTO
from services.feed.config import FEED_MESSAGES_LIMIT


class FeedService:
    @staticmethod
    async def get_feed(limit: int = FEED_MESSAGES_LIMIT) -> list[MessageDTO]:
        return [
            MessageDTO(
                id=str(message.id),
                content=message.content,
                author_username=message.author_username,
                created_at=message.created_at,
                liked_by_usernames=message.liked_by_usernames,
            )
            for message in await MessageRepository.get_last_messages(limit)
        ]
