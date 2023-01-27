#!/usr/bin/env python
import json
import asyncio
import websockets
from uuid import UUID

from src.models import ConnectionsCount, Event, Question
from src.enums import MessageType

connected = set()
clients = set()
questions = dict()


def handle_message(message):
    [type, value] = parse_message(message)


def parse_message(message):
    if (message.type == MessageType.question):
        id = UUID()
        new_question = Question(
            id=id, question=message.question, name=message.name)

        print("new_question", new_question)
        questions[id] = new_question
        print(questions)


def broadcast_connection_count():
    count = ConnectionsCount(count=len(clients))
    message = Event(type=MessageType.count, value=count)

    return websockets.broadcast(
        connected, json.dumps(message.dict())
    )


def client_connect(websocket):
    print(websocket.remote_address[0] + " connected")
    connected.add(websocket)
    clients.add(websocket.remote_address[0])
    broadcast_connection_count()


def clieent_disconnect(websocket):
    print(websocket.remote_address[0] + " disconnected")
    connected.remove(websocket)
    clients.remove(websocket.remote_address[0])
    broadcast_connection_count()


async def handler(websocket):

    client_connect(websocket)

    while True:
        try:
            message = await websocket.recv()
            # handle message
            handle_message(message)
            print("message received")
        except websockets.ConnectionClosedOK:
            clieent_disconnect(websocket)
            break
        except Exception as e:
            clieent_disconnect(websocket)
            break
        finally:
            broadcast_connection_count()
        print(json.loads(message))


async def main():
    async with websockets.serve(handler, "", 8001):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())


# get count of connected clients
