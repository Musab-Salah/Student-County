import { useEffect, useState } from "react";
import "./ChatController.css";
//import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from "./Chat";
import useComponent from "../../hooks/useComponent";
import useChat from "./../../hooks/useChat";

const ChatController = ({ From, To }) => {
  const {
    getMyAllChats,
    setConnection,
    closeConnection,
    ChatOpened,
    messages,
    previosMessages,
    setMessages,
    setPreviosMessages,
  } = useChat();
  const { connection } = useChat();

  const { setOpenChat, setOwnerItem, openChat } = useComponent();


  useEffect(() => {
    return function cleanup() {
      setOpenChat(false);
      setOwnerItem(false);
      console.log("in cleanup");
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getMyAllChats();
    // eslint-disable-next-line
  }, [previosMessages]);

  const joinRoom = async (From, To) => {
    try {

      const roomid = "5aea6cf4-43cf-450d-b475-becc931b63af";
      await connection.invoke("JoinRoom", { roomid, From, To });
      await connection.invoke("GetMessagesForUser", { roomid, From, To });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {

  }, [previosMessages, messages]);
  const sendMessage = async (message) => {

    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="messages-container">
      <Chat
        sendMessage={sendMessage}
        messages={messages}
        previosMessages={previosMessages}
        openChat={openChat}
        closeConnection={closeConnection}
        setOpenChat={setOpenChat}
        joinRoom={joinRoom}
        setMessages={setMessages}
        setPreviosMessages={setPreviosMessages}
      />
    </div>
  );
};

export default ChatController;
