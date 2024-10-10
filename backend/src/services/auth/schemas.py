import re

from pydantic import BaseModel, Field, field_validator

from config import USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH


class UsernameDTO(BaseModel):
    username: str = Field(
        min_length=USERNAME_MIN_LENGTH, max_length=USERNAME_MAX_LENGTH
    )

    @field_validator("username")
    @classmethod
    def validate_message_id(cls, value):
        if not re.match(r"^\w+$", value):
            raise ValueError(
                "Username must contain only letters, numbers, and underscores."
            )

        return value
