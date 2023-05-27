import useAuth from "../../hooks/useAuth";
import useChat from "../../hooks/useChat";
import { useEffect } from "react";
import useComponent from "../../hooks/useComponent";

const ConnectedUsers = ({ users }) => {
  const { getMyAllChats, MyChat } = useChat();
  const { decodedJwt } = useAuth();
  const { setOwnerItem, setOpenChat } = useComponent();

  useEffect(() => {
    getMyAllChats();
  }, []);

  return (
    <div className="user-list">
      <div className="flex-container">
        {Object.values(MyChat).map((chat) => (
          <div
            onClick={() => {
              setOwnerItem(decodedJwt.uid !== chat.from ? chat.from : chat.to);
              setOpenChat(true);
            }}
            key={chat.id}
            className="flex-items btn"
          >
            {decodedJwt.uid !== chat.from ? chat.fromName : chat.toName}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ConnectedUsers;
