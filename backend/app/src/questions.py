from .models import Question
from uuid import uuid4


def build_question(message_body: dict):
    built_question = Question(**message_body)
    return built_question
