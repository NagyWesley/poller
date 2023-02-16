from enum import Enum


class MessageType(str, Enum):
    connection_count_change = "connection_count_change"
    all_questions = "all_questions"
    question_asked = "question_asked"
    question_answered = "question_answered"
    question_approved = "question_approved"
    like = "like"
    question_like_count_change = "question_like_count_change"
