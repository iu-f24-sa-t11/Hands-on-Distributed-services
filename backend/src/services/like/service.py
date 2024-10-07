from common.database.repositories.message import MessageRepository
from common.database.repositories.user import UserRepository
from common.exceptions.message import MessageDoesNotExist
from common.exceptions.user import UserDoesNotExist


class LikeService:
    @staticmethod
    async def set_like(message_id: str, username: str):
        if not await UserRepository.is_exists(username=username):
            raise UserDoesNotExist()

        if not await MessageRepository.is_exists(message_id=message_id):
            raise MessageDoesNotExist(message_id=message_id)

        await MessageRepository.add_liked_username(
            message_id=message_id, username=username
        )

    @staticmethod
    async def unset_like(message_id: str, username: str):
        if not await UserRepository.is_exists(username=username):
            raise UserDoesNotExist()

        if not await MessageRepository.is_exists(message_id=message_id):
            raise MessageDoesNotExist(message_id=message_id)

        await MessageRepository.remove_liked_username(
            message_id=message_id, username=username
        )
