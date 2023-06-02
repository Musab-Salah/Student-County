import { Form, Button, FormControl, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { ImAttachment } from "react-icons/im";
import useChat from "../../hooks/useChat";

const SendMessageForm = ({}) => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useChat();

  return (
    <Form
      className="send-message-form"
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
      }}
    >
      <InputGroup className="send-input-group">
        <FormControl
          type="text"
          placeholder="Message..."
          className="send-input"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <ImAttachment className="send-attachment-icon" />
      </InputGroup>

      <button type="submit" disabled={!message} className="send-message-button">
        <RiSendPlaneFill className="send-message-icon" />
      </button>
    </Form>
  );
};

export default SendMessageForm;
