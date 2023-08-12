import { useEffect, useMemo } from "react";
import "./ChatController.css";
import Chat from "./Chat";
import useComponent from "../../hooks/useComponent";
import useChat from "./../../hooks/useChat";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";
import DashboardNavbar from "../navbar/dashboard_navbar/DashboardNavbar";
import Menu from "../menu/menu";
import "../../pages/dashboard/Dashboard.css";

const ChatController = () => {
  const {
    getMyAllChats,
    closeConnection,
    previosMessages,
    setMessages,
    setPreviosMessages,
    MyChat,
    setChatOpened,
    setMyChat,
  } = useChat();
  const {
    setOpenChatArea,
    openChatArea,
    ownerItem,
    ButtonCards,
    setOptionMenu,
  } = useComponent();
  const { decodedJwt } = useAuth();

  useEffect(() => {
    return function cleanup() {
      setOpenChatArea(false);
      setMyChat("");
      setOptionMenu("");
      setPreviosMessages("");
      setMessages("");
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
      <div style={{ opacity: ButtonCards ? 0.2 : 1 }}>
        <div className={`dashboard-container  `}>
          <Menu />
          <div className={`dashboard  `}>
            <DashboardNavbar />
            <div className="messages-container">
              <Chat
                openChatArea={openChatArea}
                closeConnection={closeConnection}
                setOpenChatArea={setOpenChatArea}
                setMessages={setMessages}
                setPreviosMessages={setPreviosMessages}
                decodedJwt={decodedJwt}
              />
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatController;
