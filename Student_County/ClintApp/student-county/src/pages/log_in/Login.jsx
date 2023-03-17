import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormGroup, Input, Label, Form, Container, Button } from "reactstrap";
import AuthContext from "../../services/auth/AuthContext";

import AuthService from "../../services/AuthServices";

const Login = ({ children }) => {
  let { loginUser } = useContext(AuthContext);
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
  const loogin =(event)=>{
    event.preventDefault();
    loginUser(bo);
  }
  return (
    <>
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
    </>
  );
};
export default Login;
