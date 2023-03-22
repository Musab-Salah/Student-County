import React, { useContext } from "react";
import { Button, Container } from "reactstrap";
import Heading from "../../components/heading/Heading";
import { useNavigate } from "react-router";
import AuthCxt from "../../context/AuthCommon";

const User_Dashboard = () => {

  const { logout } = useContext(AuthCxt);

  let navigate = useNavigate();

  return (
    <>
      <Heading />

      <Container>
        <Button onClick={() => navigate("/create_book")}>add book</Button>
        <Button onClick={() => navigate("/create_housing")}>add housing</Button>
        <Button onClick={() => navigate("/create_ride")}>add ride</Button>
        <Button onClick={logout}>logout</Button>
      </Container>
    </>
  );
};

export default User_Dashboard;
