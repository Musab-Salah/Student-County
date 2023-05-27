import SendMessageForm from "./SendMessageForm";
import MessageContainer from "./MessageContainer";
import ConnectedUsers from "./ConnectedUsers";
import { Button } from "react-bootstrap";

const Chat = ({
  sendMessage,
  messages,
  users,
  closeConnection,
  previosMessages,
  openChat
}) => (
  <div>
   
    <ConnectedUsers users={users} />
    {openChat ?   <div className="chat">
      <MessageContainer previosMessages={previosMessages} messages={messages} />
      <SendMessageForm sendMessage={sendMessage} />
    </div>:"" }
  
  </div>
);

export default Chat;
