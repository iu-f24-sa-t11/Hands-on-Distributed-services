from common.exceptions.exception import ApplicationException


class MessageDoesNotExist(ApplicationException):
    def __init__(self, message_id):
        super().__init__(message=f"Message with id {message_id} does not exist.", status_code=404)
