import SendMessageForm from "./SendMessageForm";
import MessageContainer from "./MessageContainer";
import ConnectedUsers from "./ConnectedUsers";
import { ImAttachment } from "react-icons/im";
import { RiSendPlaneFill } from "react-icons/ri";
import { TiArrowBack } from "react-icons/ti";

import useChat from "../../hooks/useChat";

const Chat = ({
  sendMessage,
  messages,
  previosMessages,
  openChat,
  setMessages,
  closeConnection,
  receiverName,
  setOpenChat,
  joinRoom,
  setPreviosMessages,
}) => {
  const { ChatOpened } = useChat();
  return (
    <>
      <ConnectedUsers
        closeConnection={closeConnection}
        setMessages={setMessages}
        joinRoom={joinRoom}
        setPreviosMessages={setPreviosMessages}
      />
      {openChat ? (
        <div className="chat">
          <div className="conversation-user-info">
            <div className="conversation-user-name">
              {" "}
              {ChatOpened.fromName ? ChatOpened.fromName : ""}
            </div>
            <div className="conversation-user-lastmessage-time">
              {ChatOpened.toRole}
            </div>
            <div className={"back-btn"}>
              <TiArrowBack
                onClick={() => setOpenChat(false)}
                className="btn btn-icon small-btn-icon "
              />
            </div>
          </div>

          <MessageContainer
            previosMessages={previosMessages}
            messages={messages}
          />
          <SendMessageForm sendMessage={sendMessage} />
        </div>
      ) : (
        ""
        //   <div className="chat">
        //   <div className="message-container">
        //     <div className="not-my-message">
        //       <div className="message">by 4</div>
        //       <div className="created-on">2023-05-27T16:03:49.2883385+03:00</div>
        //     </div>
        //     <div className="my-message">
        //       <div className="message">by musa b</div>
        //       <div className="created-on">2023-05-27T16:04:06.5433814+03:00</div>
        //     </div>
        //     <div className="my-message">
        //       <div className="message">sadf</div>
        //       <div className="created-on">2023-05-31T11:51:31.5450777+03:00</div>
        //     </div>
        //     <div className="my-message">
        //       <div className="message">4</div>
        //       <div className="created-on">2023-05-31T12:37:56.0971034+03:00</div>
        //     </div>
        //     <div className="my-message">
        //       <div className="message">sdf</div>
        //       <div className="created-on">2023-05-31T12:41:06.9143481+03:00</div>
        //     </div>
        //     <div className="my-message">
        //       <div className="message">asd</div>
        //       <div className="created-on">2023-05-31T13:16:07.9998722+03:00</div>
        //     </div>
        //     <div className="my-message">
        //       <div className="message">rynnyutunyt</div>
        //       <div className="created-on">2023-05-31T14:06:10.5718704+03:00</div>
        //     </div>
        //     <div className="my-message">
        //       <div className="message">4</div>
        //       <div className="created-on">2023-05-31T14:13:43.0862008+03:00</div>
        //     </div>
        //     <div className="my-message">
        //       <div className="message">44</div>
        //       <div className="created-on">2023-05-31T14:14:40.0828183+03:00</div>
        //     </div>
        //     <div className="my-message">
        //       <div className="message">hk 4</div>
        //       <div className="created-on">2023-05-31T17:09:03.6813914+03:00</div>
        //     </div>
        //     <div className="my-message">
        //       <div className="message">in4</div>
        //       <div className="created-on">2023-05-31T17:10:37.1969726+03:00</div>
        //     </div>
        //     <div className="my-message">
        //       <div className="message">w</div>
        //       <div className="created-on">2023-05-31T17:12:37.0171276+03:00</div>
        //     </div>
        //     <div className="my-message">
        //       <div className="message">12</div>
        //       <div className="created-on">2023-05-31T17:16:13.2530197+03:00</div>
        //     </div>
        //     <div className="my-message">
        //       <div className="message">ykuj</div>
        //       <div className="created-on">2023-05-31T17:19:02.239647+03:00</div>
        //     </div>
        //     <div className="my-message">
        //       <div className="message">edf</div>
        //       <div className="created-on">2023-05-31T17:20:09.6950116+03:00</div>
        //     </div>
        //     <div className="my-message">
        //       <div className="message">fds</div>
        //       <div className="created-on">2023-05-31T17:23:30.4261127+03:00</div>
        //     </div>
        //   </div>
        //   <form className="send-message-form">
        //     <div className="send-input-group">
        //       <input placeholder="message..." type="user" className="send-input" value="" />
        //       <ImAttachment className="send-attachment-icon" />
        //     </div>

        //     <button type="submit" disabled className="send-message-button">
        //           <RiSendPlaneFill className="send-message-icon" />
        //         </button>
        //   </form>
        // </div>
      )}
    </>
  );
};

export default Chat;
