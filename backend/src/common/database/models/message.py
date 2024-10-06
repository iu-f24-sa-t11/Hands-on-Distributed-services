from datetime import datetime

from beanie import Document


class Message(Document):
    """
    Message model

    Attributes:
    -----------
    content : str
        The content of the message
    author_username : str
        The username of the author of the message
    created_at : datetime
        The date and time the message was created
    liked_by_usernames : list[str]
        The list of usernames of users who liked the message
    """

    content: str
    author_username: str
    created_at: datetime

    liked_by_usernames: list[str]

    class Settings:
        """
        Collection configuration

        Attributes:
        -----------
        name : str
            The name of the collection in the database
        indexes : list[str]
            The list of fields to create indexes for
        """

        name = "messages"
        indexes = ["author_username"]
