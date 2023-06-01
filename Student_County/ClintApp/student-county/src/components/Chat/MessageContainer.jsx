import { useEffect, useMemo, useRef } from "react";
import useAuth from "./../../hooks/useAuth";
import useChat from "../../hooks/useChat";

const MessageContainer = ({ messages, previosMessages }) => {
  const messageRef = useRef();
  const { decodedJwt } = useAuth();
  const { ChatOpened } = useChat();
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
        .map((msg, id) =>
          msg.roomId === ChatOpened.id ? (
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
          ) : (
            ""
          )
        )}
    </div>
  );
};

export default MessageContainer;
