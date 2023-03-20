import React, { useEffect, useContext } from "react";
import AuthCxt from "../../helpers/AuthCommon";
import { withRouter } from "./WithRouter";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props, { children }) => {
  const { refresh } = useContext(AuthCxt);
  let location = props.router.location;
  //const [previosLogoutStatus, setpreviosLogoutStatus] = useState(true);
  // need to add when user close without logout delete the local storge after 10 min & check refresh token if expire or not and logic of logout
  useEffect(() => {
    //debugger
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log("decoded");
    //console.log(user.token);
    if (user) {
      const decodedJwt = parseJwt(user.token);
     // console.log(decodedJwt.uid);
      if (decodedJwt.exp * 1000 < Date.now()) {
        refresh();
      }
    } //else logout();
  }, [refresh,location]);

  return <></>;
};

export default withRouter(AuthVerify);
