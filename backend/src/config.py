import os

DB_HOST = os.getenv("DB_HOST", "mongodb://mongodb:27017")
DB_NAME = os.getenv("DB_NAME", "ApplicationDatabase")
