import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import React, { useState, createContext, useEffect, useMemo } from "react";
import useComponent from "./../hooks/useComponent";
import useAuth from "../hooks/useAuth";
import ChatServices from "../services/ChatServices";

const ChatCxt = createContext();

export function ChatsProvider({ children }) {
  const [connection, setConnection] = useState();
  const { OptionMenu, setOpenChatArea, ownerItem } = useComponent();
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
    if (isLogin && !connection) joinRoom();
    //getMyAllChats();

    // eslint-disable-next-line
  }, [isLogin]);

  useEffect(() => {
    if (isLogout && connection) closeConnection();
  }, [isLogout]);

  useEffect(() => {
    if (isLogin) getMyAllChats();
    // eslint-disable-next-line
  }, [messages]);

  const joinRoom = async () => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7245/chat")
        .configureLogging(LogLevel.None)
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
        if (Object.values(MyChat.length) > 0 && ownerItem) {
          const found = MyChat.find((obj) => {
            return (
              (obj.from === decodedJwt.uid && obj.to === ownerItem) ||
              (obj.to === decodedJwt.uid && obj.from === ownerItem)
            );
          });
          setChatOpened(found);
        }
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

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  };

  const reJoinRoom = async (From, To) => {
    setOpenChatArea(true);
    try {
      const roomid = "5aea6cf4-43cf-450d-b475-becc931b63af";
      await connection.invoke("JoinRoom", { roomid, From, To });
      await connection.invoke("GetMessagesForUser", { roomid, From, To });
    } catch (e) {
      console.log(e);
    }
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
        reJoinRoom,
        sendMessage,
        setMyChat,
      }}
    >
      {children}
    </ChatCxt.Provider>
  );
}

export default ChatCxt;
