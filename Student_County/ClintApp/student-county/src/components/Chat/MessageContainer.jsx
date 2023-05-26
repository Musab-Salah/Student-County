import { useEffect, useRef } from "react";
import useAuth from "./../../hooks/useAuth";

const MessageContainer = ({ messages, previosMessages }) => {
  const messageRef = useRef();
  const { decodedJwt } = useAuth();
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

  return (
    <div ref={messageRef} className="message-container">
      {Object.values(previosMessages)
        .sort((a, b) => Date.parse(a.createdOn) - Date.parse(b.createdOn))
        .map((msg) => (
          <div
            key={msg.id}
            className={`${
              decodedJwt.uid === msg.from ? "my-message" : "not-my-message"
            }`}
          >
            <div className="message">{msg.message}</div>
            <div className="created-on">{msg.createdOn}</div>
          </div>
        ))}

      {Object.values(messages)
        .sort((a, b) => Date.parse(a.createdOn) - Date.parse(b.createdOn))
        .map((msg, id) => (
          <div
            key={id}
            className={`${
              decodedJwt.uid === msg.from ? "my-message" : "not-my-message"
            }`}
          >
            <div className="message">{msg.message}</div>
            <div className="created-on">{msg.createdOn}</div>
          </div>
        ))}
    </div>
  );
};

export default MessageContainer;
