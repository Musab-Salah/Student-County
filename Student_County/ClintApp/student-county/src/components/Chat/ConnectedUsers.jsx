import useAuth from "../../hooks/useAuth";
import useChat from "../../hooks/useChat";
import { useEffect, useState } from "react";
import useComponent from "../../hooks/useComponent";
import { HiTrash } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";

const ConnectedUsers = ({
  users,
  setMessages,
  closeConnection,
  joinRoom,
  setPreviosMessages,
}) => {
  const { getMyAllChats, MyChat, setChatOpened, deleteChat } = useChat();
  const { decodedJwt } = useAuth();
  const { setOwnerItem, setOpenChat } = useComponent();
  const [changeToDeleteMode, setChangeToDeleteMode] = useState(false);
  const [openDeleteMode, setOpenDeleteMode] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
  
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      const formattedTime = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
      });
      return formattedTime;
    } else if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday";
    } else {
      const formattedDate = date.toLocaleDateString([], {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return formattedDate;
    }
  };
  
  

  return (
    <div className="user-list">
      <div className="user-list-top">
        <div className="messages-title">Messages</div>
        <div className="messages-icons">
          <HiTrash
            onClick={() => setOpenDeleteMode(!openDeleteMode)}
            className="trash-menu btn btn-icon small-btn-icon"
          />
          <AiOutlinePlus className="btn btn-icon small-btn-icon" />
        </div>
      </div>
      <div className="vertical-line" />
      <div className="users-list flex-container">
        {/* <button onClick={() => closeConnection()}>close</button> */}
        {Object.values(MyChat).map((chat) => (
          <div
            onClick={() => {
              setPreviosMessages([]);
              setMessages([]);
              //joinRoom()
              {
                !changeToDeleteMode && setChatOpened(chat);
              }
              {
                !changeToDeleteMode &&
                  joinRoom(
                    decodedJwt.uid,
                    decodedJwt.uid !== chat.from ? chat.from : chat.to
                  );
              }
              {
                !changeToDeleteMode &&
                  setOwnerItem(
                    decodedJwt.uid !== chat.from ? chat.from : chat.to
                  );
              }
              {
                !changeToDeleteMode && setOpenChat(true);
              }
            }}
            key={chat.id}
            className={`conversation`}
          >
            <div className="conversation-user-profile">
              <FaUserCircle className="conversation-user-avatar" />
              <div className="conversation-user-info">
                <div className="conversation-user-name">
                  {decodedJwt.uid !== chat.from ? chat.fromName : chat.toName}
                </div>

                <div className="conversation-user-lastmessage">
                  {chat.lastMessage}
                </div>
              </div>
            </div>

            {openDeleteMode ? (
              <HiTrash
                onClick={() => {
                  setChangeToDeleteMode(!openDeleteMode);
                  setOpenDeleteMode(!openDeleteMode)
                }}
                className="btn btn-icon small-btn-icon trash-list-red"
              />
            ) : (
              <div className="conversation-user-lastmessage-time">
                {" "}
                {formatDate(chat.createdOnLastMessage)}
              </div>
            )}
             {changeToDeleteMode ? (
              <BsCheckLg
                onClick={() => {
                  setOpenChat(false);
                  deleteChat(chat.id);
                }}
                className="btn btn-icon small-btn-icon trash-list-green"
              />
            ) : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectedUsers;
