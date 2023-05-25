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
              "b36eb1b9-c7e3-4137-80d6-6f9ffe2180bd" === msg.from
                ? "my-message"
                : "not-my-message"
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
              "b36eb1b9-c7e3-4137-80d6-6f9ffe2180bd" === msg.from
                ? "my-message"
                : "not-my-message"
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
