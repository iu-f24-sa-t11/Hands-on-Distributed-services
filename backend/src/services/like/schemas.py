from bson import ObjectId
from pydantic import BaseModel, Field, field_validator

from config import USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH


class LikeDTO(BaseModel):
    message_id: str
    username: str = Field(
        min_length=USERNAME_MIN_LENGTH, max_length=USERNAME_MAX_LENGTH
    )

    @field_validator("message_id")
    @classmethod
    def validate_message_id(cls, value):
        try:
            ObjectId(value)
        except Exception:
            raise ValueError("Invalid message_id")

        return value
