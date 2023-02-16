from typing import Optional
from uuid import UUID, uuid4
from pydantic import BaseModel, Field
from ipaddress import IPv4Address
from .enums import MessageType
from datetime import datetime


class ConnectionsCount(BaseModel):
    count: int


class Event(BaseModel):
    type: MessageType
    value: dict


class Question(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    question: str
    name: Optional[str]
    likes: Optional[set[IPv4Address]] = []
    created: datetime = Field(default_factory=lambda: str(datetime.now()))


class Likes(BaseModel):
    question_id: UUID
    ip: IPv4Address
