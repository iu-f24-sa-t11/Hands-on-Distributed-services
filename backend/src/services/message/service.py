from common.database.repositories.message import MessageRepository
from common.database.repositories.user import UserRepository
from common.exceptions.user import UserDoesNotExist


class MessageService:
    @staticmethod
    async def create(content: str, author_username: str) -> None:
        if not await UserRepository.is_exists(username=author_username):
            raise UserDoesNotExist()

        await MessageRepository.create(content=content, author_username=author_username)
