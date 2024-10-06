from common.database.models.user import User


class UserRepository:
    @staticmethod
    async def create(username: str) -> None:
        user = User(username=username)
        await user.create()

    @staticmethod
    async def is_exists(username: str) -> bool:
        return await User.find({"username": username}).first_or_none() is not None
