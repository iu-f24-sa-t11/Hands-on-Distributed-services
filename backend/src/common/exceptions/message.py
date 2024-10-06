from common.exceptions.exception import ApplicationException


class MessageDoesNotExist(ApplicationException):
    def __init__(self):
        super().__init__(message="Message does not exist.", status_code=404)
