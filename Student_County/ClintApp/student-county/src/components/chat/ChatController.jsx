import { useEffect, useState } from "react";
import "./ChatController.css";
//import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from "./Chat";
import useComponent from "../../hooks/useComponent";
import useChat from "./../../hooks/useChat";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";

const ChatController = () => {
  const {
    getMyAllChats,
    setConnection,
    closeConnection,
    ChatOpened,
    previosMessages,
    setMessages,
    setPreviosMessages,
  } = useChat();
  const { setOpenChatArea, setOwnerItem, openChatArea, ownerItem } = useComponent();
  const { decodedJwt } = useAuth();

  useEffect(() => {
    return function cleanup() {
      setOpenChatArea(false);
      //setOwnerItem(false);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getMyAllChats();
    // eslint-disable-next-line
  }, [previosMessages]);

  return (
    <>
    <Helmet>
        <title>Messages</title>
      </Helmet>
   
    <div className="messages-container">
      <Chat
        openChatArea={openChatArea}
        closeConnection={closeConnection}
        setOpenChatArea={setOpenChatArea}
        setMessages={setMessages}
        setPreviosMessages={setPreviosMessages}
        decodedJwt={decodedJwt}
      />
    </div> </>
  );
};

export default ChatController;
