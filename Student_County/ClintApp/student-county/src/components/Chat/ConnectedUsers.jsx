import useAuth from "../../hooks/useAuth";
import useChat from "../../hooks/useChat";
import { useEffect } from "react";
import useComponent from "../../hooks/useComponent";
import { AiOutlinePlus } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

const ConnectedUsers = ({
  users,
  setMessages,
  closeConnection,
  joinRoom,
  setPreviosMessages,
}) => {
  const { getMyAllChats, MyChat, setChatOpened } = useChat();
  const { decodedJwt } = useAuth();
  const { setOwnerItem, setOpenChat } = useComponent();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      const formattedTime = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
      });
      return `Today at ${formattedTime}`;
    } else {
      return date.toLocaleString();
    }
  };

  return (
    <div className="user-list">
      <div className="user-list-top">
        <div className="messages-title">Messages</div>
        <div className="messages-icons">
          <AiOutlinePlus className="btn btn-icon small-btn-icon" />
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
              //joinRoom();
              setChatOpened(chat);
              joinRoom(
                decodedJwt.uid,
                decodedJwt.uid !== chat.from ? chat.from : chat.to
              );
              setOwnerItem(decodedJwt.uid !== chat.from ? chat.from : chat.to);
              setOpenChat(true);
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
            <div className="conversation-user-lastmessage-time">
              {" "}
              {formatDate(chat.createdOnLastMessage)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ConnectedUsers;
