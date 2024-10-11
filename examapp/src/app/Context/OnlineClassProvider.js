import React, { createContext, useMemo, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export const SocketProvider = (props) => {
  // Memoize the socket connection
  const socket = useMemo(() => {
    try {
      return io("http://localhost:3001", {
        transports: ["websocket"], // Ensure only WebSocket transport is used to avoid CORS issues
        withCredentials: true,     // Send credentials (if needed, like cookies) with CORS requests
      });
    } catch (error) {
      console.error("Socket connection error:", error);
      return null; // Return null if there's an error
    }
  }, []); // Empty array ensures socket is created only once when component mounts

 

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
