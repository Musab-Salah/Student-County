import React from "react";
import useAuth from "../hooks/useAuth";

const WithPermission = ({ ScopeRole, children }) => {
  const { decodedJwt } = useAuth();

  let TokenRole = decodedJwt ? decodedJwt.roles : "";

  return <>{ScopeRole.includes(TokenRole) ? children : ""}</>;
};

export default WithPermission;
