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
    print(type, value)


def parse_message(message):
    event = json.loads(message)
    print(event)
    return parse_message(event)


def broadcast_connection_count():
    count = ConnectionsCount(count=len(clients))
    print(MessageType.connection_count_change, count)
    message = Event(type=MessageType.connection_count_change, value=count)

    return websockets.broadcast(
        connected, json.dumps(message.dict())
    )


def client_connect(websocket):
    print(websocket.remote_address[0] + " connected")
    connected.add(websocket)
    clients.add(websocket.remote_address[0])
    broadcast_connection_count()


def client_disconnect(websocket):
    print(websocket.remote_address[0] + " disconnected")
    connected.remove(websocket)
    clients.remove(websocket.remote_address[0])
    broadcast_connection_count()


async def handler(websocket):

    client_connect(websocket)

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
            print(str(e))
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
