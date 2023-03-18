import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormGroup, Input, Label, Form, Container, Button } from "reactstrap";
import AuthCxt from "../../helpers/AuthCommon";
import Heading from "../../components/heading/Heading";

import AuthService from "../../services/AuthServices/AuthServices";

const Login = ({ children }) => {
  const { logout, login } = useContext(AuthCxt);

  let [bo, setbo] = useState();

  const setUserName = (e) => {
    setbo({
      ...bo,
      userName: e.target.value,
    });
  };
  const setPassword = (e) => {
    setbo({
      ...bo,
      password: e.target.value,
    });
  };
  const loogin = (e) => {
    e.preventDefault();
    login(bo);
  };
  return (
    <>
      <Heading />
      <Form onSubmit={loogin}>
        <input
          onChange={setUserName}
          type="text"
          name="username"
          placeholder="Enter Username"
        />
        <input
          onChange={setPassword}
          type="password"
          name="password"
          placeholder="Enter Password"
        />
        <Button>dsf</Button>
      </Form>
      <Button onClick={logout}>logout</Button>
    </>
  );
};
export default Login;
