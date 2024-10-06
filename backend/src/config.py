import os

DB_HOST = os.getenv("DB_HOST", "mongodb://mongodb:27017")
DB_NAME = os.getenv("DB_NAME", "ApplicationDatabase")

USERNAME_MIN_LENGTH = os.getenv("USERNAME_MIN_LENGTH", 3)
USERNAME_MAX_LENGTH = os.getenv("USERNAME_MAX_LENGTH", 30)

MESSAGE_MIN_LENGTH = os.getenv("MESSAGE_MIN_LENGTH", 1)
MESSAGE_MAX_LENGTH = os.getenv("MESSAGE_MAX_LENGTH", 400)
