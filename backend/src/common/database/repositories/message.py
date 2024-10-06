from common.database.models.message import Message


class MessageRepository:
    @staticmethod
    async def create(content: str, author_username: str) -> None:
        user = Message(content=content, author_username=author_username)
        await user.create()
