from bson import ObjectId

from common.database.models.message import Message


class MessageRepository:
    @staticmethod
    async def create(content: str, author_username: str) -> Message:
        message = Message(content=content, author_username=author_username)
        await message.create()
        return message

    @staticmethod
    async def is_exists(message_id: str) -> bool:
        return await Message.find_one({"_id": ObjectId(message_id)}) is not None

    @staticmethod
    async def add_liked_username(message_id: str, username: str):
        message = await Message.find_one({"_id": ObjectId(message_id)})
        if username not in message.liked_by_usernames:
            message.liked_by_usernames.append(username)
            await message.save()

    @staticmethod
    async def remove_liked_username(message_id: str, username: str):
        message = await Message.find_one({"_id": ObjectId(message_id)})
        if username in message.liked_by_usernames:
            message.liked_by_usernames.remove(username)
            await message.save()
