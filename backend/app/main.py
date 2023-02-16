#!/usr/bin/env python
import json
import asyncio
import websockets
from uuid import UUID

from src.models import ConnectionsCount, Event, Question
from src.enums import MessageType
from src.questions import build_question

connected = set()
clients = set()
questions = dict()


def handle_message(message):
    [type, value] = parse_message(message)
    print(type, value)
    match type:
        case MessageType.question_asked:
            try:
                question = build_question(value)
                questions[question.id] = question
                message = Event(
                    type=MessageType.question_approved, value=question)
                print("all_questions", questions)
                broadcast_message(message)
            except Exception as e:
                print(str(e))


def parse_message(message):
    event = json.loads(message)
    print(event)
    return event.get("type"), event.get("value")


def broadcast_message(message: Event):

    return websockets.broadcast(
        connected, json.dumps(message.dict())
    )


def broadcast_connection_count():
    count = ConnectionsCount(count=len(clients))
    print(MessageType.connection_count_change, count)
    message = Event(type=MessageType.connection_count_change, value=count)

    broadcast_message(message)


async def send_all_qestions(websocket):
    if questions:
        print("all_questions", str(questions))
        message = Event(type=MessageType.all_questions,
                        value=questions)

        print("sending_all_questions", str(message))
        await websocket.send(json.dumps(message.dict()))


async def client_connect(websocket):

    # print(str(websocket.remote_address)+"sx")
    connected.add(websocket)
    clients.add(websocket.remote_address[0])
    broadcast_connection_count()
    await send_all_qestions(websocket)


def client_disconnect(websocket):
    print(websocket.remote_address[0] + " disconnected")
    connected.remove(websocket)
    clients.remove(websocket.remote_address[0])
    broadcast_connection_count()


async def handler(websocket):

    await client_connect(websocket)

    while True:
        try:
            message = await websocket.recv()
            print("message", message)
            # handle message
            handle_message(message)
            print("message received")
        except websockets.ConnectionClosedOK:
            print("connection closed")
            client_disconnect(websocket)
            break
        except Exception as e:
            print("error", str(e))
            client_disconnect(websocket)
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
