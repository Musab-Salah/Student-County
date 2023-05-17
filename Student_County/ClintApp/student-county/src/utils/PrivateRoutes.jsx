import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = () => {
  const { decodedJwt } = useAuth();

  const scopes = ["Dentistry Student", "Patient", "Student"];

  let auth = decodedJwt ? decodedJwt.roles : "false";
  return scopes.includes(auth) ? <Outlet /> : <Navigate to="/sign_in" />;
};

export default PrivateRoutes;
