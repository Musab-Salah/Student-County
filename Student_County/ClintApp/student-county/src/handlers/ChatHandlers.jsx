import { toast } from "react-toastify";

import React, { useState, createContext, useEffect, useMemo } from "react";
import useComponent from "./../hooks/useComponent";
import useAuth from "../hooks/useAuth";
import ChatServices from "../services/ChatServices";

const ChatCxt = createContext();

export function ChatsProvider({ children }) {
  const { OptionMenu, setOpenChatArea, ownerItem } = useComponent();
  const {
    decodedJwt,
    token,
    isLogin,
    isLogout,
    connection,
    messages,
    previosMessages,
    setPreviosMessages,
    setMessages,
    unreadCount,
    setUnreadCount,
  } = useAuth();
  const [MyChat, setMyChat] = useState([]); //all user chat
  const [ChatLoader, setChatLoader] = useState("");
  const [ChatOpened, setChatOpened] = useState("");
  const [ChatError, setError] = useState("");
  const [Not, setNot] = useState("");

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const cleanupError = () =>
    sleep(5000).then(() => {
      setError("");
    });
  // useEffect(() => {
  //   if (isLogin && !connection) {
  //     joinRoom();
  //   }
  //   //getMyAllChats();

  //   // eslint-disable-next-line
  // }, [isLogin]);

  // useEffect(() => {
  //   if (isLogout && connection) closeConnection();
  // }, [isLogout]);

  useEffect(() => {
    if (isLogin && connection) getMyAllChats();
    // eslint-disable-next-line
  }, [messages]);
  useEffect(() => {
    if (connection && isLogin) {
      //getUnreadMessageCount(decodedJwt.uid);
    }
  }, [connection, messages]);
  useMemo(() => {
    console.log(unreadCount);
  }, [unreadCount]);

  // const getUnreadMessageCount = async (to) => {
  //   try {
  //     const count = await connection.invoke("GetUnreadMessageCount", to);
  //     setUnreadCount(count);
  //   } catch (error) {
  //     console.log("Failed to get unread message count:", error);
  //   }
  // };

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

  const reJoinRoom = async (from, to, roomId) => {
    setOpenChatArea(true);
    try {
      await connection.invoke("JoinRoom", { from, to, roomId });
      await connection.invoke("GetMessagesForUser", { from, to, roomId });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ChatCxt.Provider
      value={{
        getMyAllChats,
        connection,
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
