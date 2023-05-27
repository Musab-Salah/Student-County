import SendMessageForm from "./SendMessageForm";
import MessageContainer from "./MessageContainer";
import ConnectedUsers from "./ConnectedUsers";

const Chat = ({ sendMessage, messages, previosMessages, openChat }) => (
  <div>
    <ConnectedUsers />
    {openChat ? (
      <div className="chat">
        <MessageContainer
          previosMessages={previosMessages}
          messages={messages}
        />
        <SendMessageForm sendMessage={sendMessage} />
      </div>
    ) : (
      ""
    )}
  </div>
);

export default Chat;
