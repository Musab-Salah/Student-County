import useAuth from "../../hooks/useAuth";
import useChat from "../../hooks/useChat";
import { useEffect } from "react";
import useComponent from "../../hooks/useComponent";
import { AiOutlinePlus } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

const ConnectedUsers = ({ users, setMessages, closeConnection }) => {
  const { getMyAllChats, MyChat, joinRoom } = useChat();
  const { decodedJwt } = useAuth();
  const { setOwnerItem, setOpenChat  } = useComponent();

  useEffect(() => {
    getMyAllChats();
  }, []);

  return (
    <div className="user-list">
      <div className="user-list-top">
        <div className="messages-title">Messages</div>
        <div className="messages-icons">
          <AiOutlinePlus className="btn btn-icon small-btn-icon"/>
          <AiOutlinePlus className="btn btn-icon small-btn-icon"/>
        </div>
      </div>
      <div className="vertical-line" />
      <div className="users-list flex-container">

        {/* <button onClick={() => closeConnection()}>close</button> */}
        {Object.values(MyChat).map((chat) => (
          <div
            onClick={() => {
              //joinRoom();
              setOwnerItem(decodedJwt.uid !== chat.from ? chat.from : chat.to);
              setOpenChat(true);
            }}
            key={chat.id}
            className={`conversation`}
          >
            <div className="conversation-user-profile">
              <FaUserCircle className="conversation-user-avatar" />
              <div className="conversation-user-info">
                <div className="conversation-user-name">{decodedJwt.uid !== chat.from ? chat.fromName : chat.toName}</div>
                <div className="conversation-user-lastmessage">put the last message here</div>
              </div>
            </div>
            <div className="conversation-user-lastmessage-time">10:00 PM</div>
          </div> 
        ))}
      </div>
    </div>
  );
};
export default ConnectedUsers;
