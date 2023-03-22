import React, { useEffect, useContext, useState } from "react";
import AuthCxt from "../../context/AuthCommon";
import { withRouter } from "./WithRouter";
import add from "./../../../node_modules/lodash-es/add";
import useIdle from "../../hooks/useIdleTimeout";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props, { children }) => {
  const { isIdle, idleTimer } = useIdle({ idleTime: 60 * 15 });

  const { refresh, setIsLogout, isLogout, logout, isLogin } =
    useContext(AuthCxt);
  let location = props.router.location;
  const [previosLogoutStatus, setpreviosLogoutStatus] = useState(false);
  // need to add when user close without logout delete the local storge after 10 min & check refresh token if expire or not and logic of logout
  useEffect(() => {
    //if (isIdle) idleTimer.reset();
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("decoded");
    if (!isLogout && isLogin) {
      if (user && !isIdle) {
        idleTimer.reset();
        const decodedJwt = parseJwt(user.token);
        const dexp = decodedJwt.exp * 1000;
        if (dexp < Date.now()) {
          console.log("refresh");
          refresh();
        }
      } else if (!user || isIdle) logout();
    }
  }, [refresh, location]);

  return <></>;
};

export default withRouter(AuthVerify);
