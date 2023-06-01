import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import React, { useState, createContext, useEffect } from "react";
import useComponent from "./../hooks/useComponent";
import useAuth from "../hooks/useAuth";
import ChatServices from "../services/ChatServices";

const ChatCxt = createContext();

export function ChatsProvider({ children }) {
  const [connection, setConnection] = useState();
  const { OptionMenu } = useComponent();
  const { decodedJwt, token, isLogin, isLogout } = useAuth();
  const [MyChat, setMyChat] = useState([]); //all user chat
  const [ChatLoader, setChatLoader] = useState("");
  const [ChatOpened, setChatOpened] = useState("");
  const [ChatError, setError] = useState("");
  const [messages, setMessages] = useState([]);

  const [previosMessages, setPreviosMessages] = useState([]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const cleanupError = () =>
    sleep(5000).then(() => {
      setError("");
    });
  useEffect(() => {
    if (isLogin) joinRoom();
    //getMyAllChats();

    // eslint-disable-next-line
  }, [isLogin]);

  useEffect(() => {
    if (isLogout) closeConnection();
  }, [isLogout]);

  const joinRoom = async () => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7245/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (roomId, message) => {
        setMessages((messages) => [...messages, message]);
      });

      connection.on("ReceiveMessages", (from, Messages) => {
        setPreviosMessages(Messages);
      });

      await connection.start();
      setConnection(connection);
      getMyAllChats();
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
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

  const deleteChat = (roomid) => {
    setChatLoader(true);
    ChatServices.deleteChat(decodedJwt.uid, roomid, token)
      .then((res) => {
        getMyAllChats();
        setError(null);
      })
      .catch(() => {
        setError("Failed delete chat...");
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
        ChatOpened,
        setChatOpened,
        messages,
        previosMessages,
        setMessages,
        setPreviosMessages,
        deleteChat,
      }}
    >
      {children}
    </ChatCxt.Provider>
  );
}

export default ChatCxt;
