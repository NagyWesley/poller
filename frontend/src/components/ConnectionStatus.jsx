import { useState, useEffect } from "react";

import { parseMessage } from "../utils/parser";

import socket from "../utils/websocket";

const ConnectionStatus = () => {
  const [count, setCount] = useState(0);
  const [state, setState] = useState("مغلق");

  useEffect(() => {
    socket.addEventListener("message", (event) => {
      const message = parseMessage(event.data);

      setCount(message["connection_count_change"].count);

      setState("مفتوح");
    });

    socket.addEventListener("open", (event) => {
      console.log("opened ");
      setState("مفتوح");
    });

    socket.addEventListener("close", (event) => {
      console.log("closed");
      setState("مغلق");
    });
  }, []);

  return (
    <>
      الاتصال: {state}
      <b>متصلين: ({count})</b>
    </>
  );
};

export default ConnectionStatus;
