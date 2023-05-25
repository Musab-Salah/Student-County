import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Lobby = ({ joinRoom }) => {
  const [user, setUser] = useState();
  const [room, setRoom] = useState();

  return (
    <Form
      className="lobby"
      onSubmit={(e) => {
        e.preventDefault();
        joinRoom(
          "0016dde9-86d2-4a24-b1b0-5b81504ea214",
          "b36eb1b9-c7e3-4137-80d6-6f9ffe2180bd"
        );
      }}
    >
      <Form.Group>
        <Form.Control
          placeholder="name"
          onChange={(e) => setUser(e.target.value)}
        />
        <Form.Control
          placeholder="room"
          onChange={(e) => setRoom(e.target.value)}
        />
      </Form.Group>
      <Button variant="success" type="submit" disabled={!user || !room}>
        Join
      </Button>
    </Form>
  );
};

export default Lobby;
