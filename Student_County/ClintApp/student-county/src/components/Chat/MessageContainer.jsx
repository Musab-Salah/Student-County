import { useEffect,  useRef } from "react";
import useAuth from "./../../hooks/useAuth";
import useChat from "../../hooks/useChat";

const MessageContainer = () => {
  const messageRef = useRef();
  const { decodedJwt } = useAuth();
  const {  messages, previosMessages } = useChat();
  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [messages, previosMessages]);

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
    <div ref={messageRef} className="message-container">
      {Object.values(previosMessages)
        .sort((a, b) => Date.parse(a.createdOn) - Date.parse(b.createdOn))
        .map((msg) => (
          <div
            key={msg.id}
            className={`${
              decodedJwt.uid === msg.from
                ? "my-message-container"
                : "not-my-message-container"
            }`}
          >
            <div
              className={`${
                decodedJwt.uid === msg.from ? "my-message" : "not-my-message"
              }`}
            >
              <div className="message">{msg.message}</div>
            </div>
            <div className="created-on">{formatDate(msg.createdOn)}</div>
          </div>
        ))}

      {Object.values(messages)
        .sort((a, b) => Date.parse(a.createdOn) - Date.parse(b.createdOn))
        .map((msg, id) => (
          <div
            key={id}
            className={`${
              decodedJwt.uid === msg.from
                ? "my-message-container"
                : "not-my-message-container"
            }`}
          >
            <div
              className={`${
                decodedJwt.uid === msg.from ? "my-message" : "not-my-message"
              }`}
            >
              <div className="message">{msg.message}</div>
            </div>
            <div className="created-on">{formatDate(msg.createdOn)}</div>
          </div>
        ))}
    </div>
  );
};

export default MessageContainer;
