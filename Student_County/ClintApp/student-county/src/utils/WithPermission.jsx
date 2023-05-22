import React from "react";
import useAuth from "../hooks/useAuth";

const WithPermission = ({ scopeFOR, children }) => {
  const { decodedJwt } = useAuth();

  let authROLE = decodedJwt ? decodedJwt.roles : "";

  return <>{scopeFOR.includes(authROLE) ? children : ""}</>;
};

export default WithPermission;
