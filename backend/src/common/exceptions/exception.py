from fastapi import Request, Response


class ApplicationException(Exception):
    def __init__(self, message: str, status_code: int):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


def application_exception_handler(request: Request, exc: ApplicationException):
    return Response(status_code=exc.status_code, content=exc.message)
