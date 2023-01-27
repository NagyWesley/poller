import { useState, useCallback, useEffect } from "react";
import { ReadyState } from "react-use-websocket";

import { parseMessage } from "../utils/parser";
import { useContext } from "react";
import { SocketContext } from "../Context";
const ConnectionStatus = () => {
  const ctx = useContext(SocketContext);

  const [count, setCount] = useState(0);

  const { lastMessage, readyState } = ctx?.socket;

  useEffect(() => {
    if (lastMessage !== null) {
      const data = parseMessage(lastMessage);
      setCount(data.count);
    }
  }, [lastMessage, setCount]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "يتم الاتصال",
    [ReadyState.OPEN]: "مفتوح",
    [ReadyState.CLOSING]: "يتم الاغلاق",
    [ReadyState.CLOSED]: "مغلق",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <>
      الاتصال: {connectionStatus}
      <b>متصلين: ({count})</b>
    </>
  );
};

export default ConnectionStatus;
