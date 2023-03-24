import React, { useEffect } from "react";
import { withRouter } from "./WithRouter";
import useIdle from "../hooks/useIdleTimeout";
import useAuth from "../hooks/useAuth";

const AuthVerify = (props, { children }) => {
  const { isIdle, idleTimer } = useIdle({});

  const { refresh, isLogout, logout, isLogin, decodedJwt, userInLocal } =
    useAuth();
  let location = props.router.location;
  // need to add when user close without logout delete the local storge after 10 min & check refresh token if expire or not and logic of logout
  useEffect(() => {
    //if (isIdle) idleTimer.reset();
    if (!isLogout && isLogin) {
      if (userInLocal && !isIdle) {
        idleTimer.reset();
        const dexp = decodedJwt.exp * 1000;
        if (dexp < Date.now()) {
          refresh();
        }
      } else if (!userInLocal || isIdle) logout();
    }
    // eslint-disable-next-line
  }, [refresh, location]);

  return <></>;
};

export default withRouter(AuthVerify);
