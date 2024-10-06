from beanie import Document


class User(Document):
    """
    User model

    Attributes:
    -----------
    username : str
        The username of the user
    """

    username: str

    class Collection:
        """
        Collection configuration

        Attributes:
        -----------
        name : str
            The name of the collection in the database
        indexes : list[str]
            The list of fields to create indexes for
        """

        name = "users"
        indexes = ["username"]
