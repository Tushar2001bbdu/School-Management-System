"use client";
import React, { createContext, useMemo, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export const SocketProvider = (props) => {
  // Memoize the socket connection
  const socket = useMemo(() => io("http://localhost:3001", {
    transports: ["websocket"], // Ensure only WebSocket transport is used to avoid CORS issues
    withCredentials: true,     // Send credentials (if needed, like cookies) with CORS requests
  }), []); // Empty array ensures socket is created only once when component mounts

  useEffect(() => {
    // Cleanup the socket when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
