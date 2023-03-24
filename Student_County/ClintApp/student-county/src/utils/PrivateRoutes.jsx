import { Outlet, Navigate } from "react-router-dom";
import React, { useState, useMemo } from "react";
import { withRouter } from "./WithRouter";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const PrivateRoutes = (props) => {
  const [decodedJwt, setDecodedJwt] = useState(false);
  let location = props.router.location;

  useMemo(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    user ? setDecodedJwt(parseJwt(user.token)) : setDecodedJwt(false);
  }, [location]);

  let auth = decodedJwt ? decodedJwt.roles : "false";
  return auth === "Student" ? <Outlet /> : <Navigate to="/login" />;
};

export default withRouter(PrivateRoutes);
