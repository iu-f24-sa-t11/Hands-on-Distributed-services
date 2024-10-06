from common.database.models.message import Message


class MessageRepository:
    @staticmethod
    async def create(content: str, author_username: str) -> Message:
        message = Message(content=content, author_username=author_username)
        await message.create()
        return message
