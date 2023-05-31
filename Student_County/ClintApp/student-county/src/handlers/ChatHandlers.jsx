import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import React, { useState, createContext, useEffect } from "react";
import useComponent from "./../hooks/useComponent";
import useAuth from "../hooks/useAuth";
import ChatServices from "../services/ChatServices";

const ChatCxt = createContext();

export function ChatsProvider({ children }) {
  const [connection, setConnection] = useState();
  const { OptionMenu } = useComponent();
  const { decodedJwt, token, isLogin } = useAuth();
  const [MyChat, setMyChat] = useState([]); //all user chat
  const [ChatLoader, setChatLoader] = useState("");
  const [ChatError, setError] = useState("");

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const cleanupError = () =>
    sleep(5000).then(() => {
      setError("");
    });
  useEffect(() => {
    if (isLogin) {
      joinRoom();
      //getMyAllChats();
    }
    // eslint-disable-next-line
  }, [isLogin]);

  const joinRoom = async () => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7245/chat")
        .configureLogging(LogLevel.Information)
        .build();

      await connection.start();
      setConnection(connection);
      getMyAllChats();
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      //await connection.stop();
    } catch (e) {
      console.log(e);
    }
  };

  const getMyAllChats = () => {
    setChatLoader(true);
    ChatServices.getMyAllChats(decodedJwt.uid, token)
      .then((res) => {
        setMyChat(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the chats...");
        cleanupError();
      })
      .finally(() => setChatLoader(false));
  };

  return (
    <ChatCxt.Provider
      value={{
        joinRoom,
        getMyAllChats,
        connection,
        setConnection,
        closeConnection,
        MyChat,
        ChatLoader,
        ChatError,
      }}
    >
      {children}
    </ChatCxt.Provider>
  );
}

export default ChatCxt;
