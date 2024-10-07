from common.database.repositories.message import MessageRepository
from common.database.repositories.user import UserRepository
from common.exceptions.user import UserDoesNotExist
from common.schemas.message import MessageDTO


class MessageService:
    @staticmethod
    async def create(content: str, author_username: str) -> MessageDTO:
        if not await UserRepository.is_exists(username=author_username):
            raise UserDoesNotExist(username=author_username)

        message = await MessageRepository.create(content=content, author_username=author_username)

        return MessageDTO(
            id=str(message.id),
            content=message.content,
            author_username=message.author_username,
            created_at=message.created_at,
            liked_by_usernames=message.liked_by_usernames,
        )
