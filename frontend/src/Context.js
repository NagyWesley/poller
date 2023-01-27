import { createContext } from "react";
import useWebSocket from "react-use-websocket";

const socketUrl = "ws://localhost:8001";

export const SocketContext = createContext(null);

const ContextProvider = (props) => {
  const socket = useWebSocket(socketUrl, {
    onOpen: () => console.log("opened"),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
    onError: (event) => console.log("error", event.target),
    onClose: (event) => console.log("close", event.target),
  });

  return (
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default ContextProvider;
