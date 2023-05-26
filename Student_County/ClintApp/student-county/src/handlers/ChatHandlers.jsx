import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import React, { useState, createContext, useEffect } from "react";

const ChatCxt = createContext();

export function ChatsProvider({ children }) {
  const [connection, setConnection] = useState();
  useEffect(() => {
    joinRoom();
    // eslint-disable-next-line
  }, []);

  const closeConnection = async () => {
    try {
      await connection.stop();
      setConnection();
    } catch (e) {
      console.log(e);
    }
  };

  const joinRoom = async () => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7245/chat")
        .configureLogging(LogLevel.None)
        .build();

      await connection.start();
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ChatCxt.Provider
      value={{ joinRoom, connection, setConnection, closeConnection }}
    >
      {children}
    </ChatCxt.Provider>
  );
}

export default ChatCxt;
