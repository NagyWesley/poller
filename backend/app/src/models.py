from typing import Optional
from uuid import UUID
from pydantic import BaseModel
from ipaddress import IPv4Address
from .enums import MessageType


class ConnectionsCount(BaseModel):
    count: int


class Event(BaseModel):
    type: MessageType
    value: BaseModel


class Question(BaseModel):
    id: UUID
    question: str
    name: Optional[str]
    likes: set[IPv4Address] = []


class Likes(BaseModel):
    question_id: UUID
    ip: IPv4Address
