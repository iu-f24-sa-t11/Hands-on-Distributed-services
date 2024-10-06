from common.database.repositories.user import UserRepository
from common.exceptions.user import UserAlreadyExists, UserDoesNotFound


class AuthService:
    @staticmethod
    async def register(username: str) -> None:
        if await UserRepository.is_exists(username):
            raise UserAlreadyExists()

        await UserRepository.create(username)

    @staticmethod
    async def login(username: str) -> None:
        if not await UserRepository.is_exists(username):
            raise UserDoesNotFound()
