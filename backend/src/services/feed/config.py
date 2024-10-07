import os

SERVICE_ROOT_PATH = "/api/feed"

FEED_MESSAGES_LIMIT = os.getenv("FEED_MESSAGES_LIMIT", 10)
