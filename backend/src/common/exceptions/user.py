from common.exceptions.exception import ApplicationException


class UserAlreadyExists(ApplicationException):
    def __init__(self, username: str):
        super().__init__(
            message=f"User with username {username} already exists.", status_code=400
        )


class UserDoesNotExist(ApplicationException):
    def __init__(self, username: str):
        super().__init__(
            message=f"User with username {username} does not exist.", status_code=404
        )
