import React, { useState, useRef, useContext } from "react";
import {  Form, Button } from "reactstrap";
import useAuth from "../../hooks/useAuth";



const Login = ({ children }) => {
  const { logout, login } = useAuth();

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
