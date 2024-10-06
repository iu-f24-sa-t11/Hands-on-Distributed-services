from pydantic import BaseModel, Field

from config import (
    MESSAGE_MIN_LENGTH,
    MESSAGE_MAX_LENGTH,
    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
)


class CreateMessageDTO(BaseModel):
    content: str = Field(
        min_length=MESSAGE_MIN_LENGTH,
        max_length=MESSAGE_MAX_LENGTH,
        title="The content of the message",
    )
    author_username: str = Field(
        min_length=USERNAME_MIN_LENGTH,
        max_length=USERNAME_MAX_LENGTH,
        title="The username of the author of the message",
    )
