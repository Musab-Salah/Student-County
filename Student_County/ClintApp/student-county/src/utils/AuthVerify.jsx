import React, { useEffect } from "react";
import { withRouter } from "./WithRouter";
import useIdle from "../hooks/useIdleTimeout";
import useAuth from "../hooks/useAuth";
import useComponent from "../hooks/useComponent";
const AuthVerify = (props, { children }) => {
  const { isIdle, idleTimer, setIdle } = useIdle({});
  const { OptionMenu, ButtonCards } = useComponent();

  const { refresh, isLogout, logout, isLogin, decodedJwt, userInLocal } =
    useAuth();
  let location = props.router.location;
  useEffect(() => {
    if (!isLogout && isLogin) {
      if (userInLocal && !isIdle) {
        idleTimer.reset();
        const dexp = decodedJwt.exp * 1000;
        const event = new Date(dexp);
        event.setMinutes(event.getMinutes() - 5);
        let nowtime = event.getTime();
        if (Math.round(nowtime / 1000) < Math.round(Date.now() / 1000)) {
          refresh();
        }
      } else if (!userInLocal || isIdle) {
        setIdle(false);
        logout();
      }
    }
    // eslint-disable-next-line
  }, [location, ButtonCards, OptionMenu]);

  return <></>;
};

export default withRouter(AuthVerify);
