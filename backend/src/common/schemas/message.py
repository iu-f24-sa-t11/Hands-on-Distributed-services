from datetime import datetime

from pydantic import BaseModel, Field


class MessageDTO(BaseModel):
    id: str
    content: str
    author_username: str
    created_at: datetime

    liked_by_usernames: list[str] = Field(default_factory=list)
