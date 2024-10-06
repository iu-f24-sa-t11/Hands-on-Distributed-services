from common.exceptions.exception import ApplicationException


class UserAlreadyExists(ApplicationException):
    def __init__(self):
        super().__init__(message="User already exists.", status_code=400)


class UserDoesNotFound(ApplicationException):
    def __init__(self):
        super().__init__(message="User does not found.", status_code=404)
