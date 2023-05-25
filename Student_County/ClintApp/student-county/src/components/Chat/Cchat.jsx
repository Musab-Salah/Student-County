import { useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Lobby from "./Lobby";
import "./Cchat.css";
//import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from "./Chat";

const Cchat = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const joinRoom = async (From, To) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7245/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (From, message) => {
        setMessages((messages) => [...messages, { From, message }]);
      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose((e) => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });
      const roomid = "5aea6cf4-43cf-450d-b475-becc931b63af";
      await connection.start();
      await connection.invoke("JoinRoom", { roomid, From, To });
      await connection.invoke("GetMessagesForUser", { roomid, From, To });
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
      const roomid = "5aea6cf4-43cf-450d-b475-becc931b63af";
      const From = "0016dde9-86d2-4a24-b1b0-5b81504ea214";
      const To = "b36eb1b9-c7e3-4137-80d6-6f9ffe2180bd";
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="app">
      <h2>MyChat</h2>
      <hr className="line" />
      {!connection ? (
        <Lobby joinRoom={joinRoom} />
      ) : (
        <Chat
          sendMessage={sendMessage}
          messages={messages}
          users={users}
          closeConnection={closeConnection}
        />
      )}
    </div>
  );
};

export default Cchat;
