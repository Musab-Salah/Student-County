import React, { useEffect, useState, useContext } from "react";
import AuthService from "./AuthServices";
import AuthCxt from "../../helpers/AuthCommon";
import { withRouter } from "./WithRouter";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props ,{ children }) => {
  const {  refresh } = useContext(AuthCxt);
  let location = props.router.location;
  const [previosLogoutStatus, setpreviosLogoutStatus] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("decoded");
    if (user) {
      const decodedJwt = parseJwt(user.token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        refresh();
      }
    } //else logout();
  }, [location]);

  return <></>;
};

export default withRouter(AuthVerify);
