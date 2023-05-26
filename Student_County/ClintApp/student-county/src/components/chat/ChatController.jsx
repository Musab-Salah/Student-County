import { useEffect, useState } from "react";
import "./ChatController.css";
//import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from "./Chat";
import useComponent from "../../hooks/useComponent";
import useChat from "./../../hooks/useChat";

const ChatController = ({ From, To }) => {
  const { connection } = useChat();
  const [messages, setMessages] = useState([]);
  const [previosMessages, setPreviosMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const { setOpenChat, setOwnerItem } = useComponent();
  useEffect(() => {
    if (From && To) joinRoom(From, To);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return function cleanup() {
      setOpenChat(false);
      setOwnerItem(false);
    };
    // eslint-disable-next-line
  }, []);

  const joinRoom = async (From, To) => {
    try {
      connection.on("ReceiveMessage", (from, message) => {
        setMessages((messages) => [...messages, message]);
      });

      connection.on("ReceiveMessages", (from, Messages) => {
        setPreviosMessages(Messages);
      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      const roomid = "5aea6cf4-43cf-450d-b475-becc931b63af";
      await connection.invoke("JoinRoom", { roomid, From, To });
      await connection.invoke("GetMessagesForUser", { roomid, From, To });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log(previosMessages);
    console.log(messages);
  }, [previosMessages, messages]);
  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="app">
      <h2>MyChat</h2>
      <hr className="line" />

      <Chat
        sendMessage={sendMessage}
        messages={messages}
        users={users}
        previosMessages={previosMessages}
      />
    </div>
  );
};

export default ChatController;
