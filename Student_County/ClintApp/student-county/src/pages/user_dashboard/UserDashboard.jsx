import React from "react";
import { Button, Container } from "reactstrap";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const UserDashboard = () => {
  const { logout } = useAuth();

  let navigate = useNavigate();

  return (
    <>

      <Container>
        <Button onClick={() => navigate("/create_book")}>add book</Button>
        <Button onClick={() => navigate("/create_housing")}>add housing</Button>
        <Button onClick={() => navigate("/create_ride")}>add ride</Button>
        <Button onClick={logout}>logout</Button>
      </Container>
    </>
  );
};

export default UserDashboard;
