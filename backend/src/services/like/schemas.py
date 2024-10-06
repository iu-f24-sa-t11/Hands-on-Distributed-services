from pydantic import BaseModel, Field

from config import USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH


class LikeDTO(BaseModel):
    message_id: str
    username: str = Field(
        min_length=USERNAME_MIN_LENGTH, max_length=USERNAME_MAX_LENGTH
    )
