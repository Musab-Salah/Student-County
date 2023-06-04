import SendMessageForm from "./SendMessageForm";
import MessageContainer from "./MessageContainer";
import ConnectedUsers from "./ConnectedUsers";
import { ImAttachment } from "react-icons/im";
import { RiSendPlaneFill } from "react-icons/ri";
import { TiArrowBack } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";
import useChat from "../../hooks/useChat";

const Chat = ({
  openChatArea,
  setMessages,
  closeConnection,
  receiverName,
  setOpenChatArea,
  setPreviosMessages,
  decodedJwt,
}) => {
  const { ChatOpened, setChatOpened } = useChat();

  /*const ChatOpened = {
    from: "user1",
    fromName: "John",
    toName: "Alice",
    toRole: "Admin",
  };

  const decodedJwt = {
    uid: "user2",
  };*/

  return (
    <>
      <ConnectedUsers
        closeConnection={closeConnection}
        setMessages={setMessages}
        setPreviosMessages={setPreviosMessages}
      />
      {openChatArea ? (
        <div className="chat">
          <div className="conversation-selected-user-info-container">
            <div className="conversation-selected-user-profile">
              <FaUserCircle className="conversation-selected-user-avatar" />
              <div className="conversation-selected-user-info">
                <div className="conversation-selected-user-name">
                  {ChatOpened.from &&
                    (decodedJwt.uid !== ChatOpened.from
                      ? ChatOpened.fromName
                      : ChatOpened.toName)}
                  {/* {!ChatOpened.from && !ChatOpened.from && ChatOpened} */}
                </div>
                <div className="conversation-selected-user-role">
                  {ChatOpened.toRole}
                </div>
              </div>
            </div>
            <div className="back-btn">
              <TiArrowBack
                onClick={() => {
                  setChatOpened("");
                  setOpenChatArea(false);
                }}
                className="btn btn-icon small-btn-icon"
              />
            </div>
          </div>
          <div className="vertical-line" />
          <MessageContainer />
          <div className="vertical-line" />
          <SendMessageForm />
        </div>
      ) : (
        <div className="chat">
          <div className="message-container">
            <div className="no-chat">
              <img
                alt=""
                src="assets/images/no-conversation.svg"
                className="no-chat-img"
              />
              <div className="no-chat-texts">
                <div className="no-chat-title">Conversations Await You</div>
                <div className="no-chat-description">
                  Start chatting by choosing someone from the left. Your chat
                  feed is currently blank!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
