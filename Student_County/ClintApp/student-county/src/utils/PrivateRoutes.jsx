import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = () => {
  const { decodedJwt } = useAuth();

  const roles = {
    scopes: "Dentistry Student" | "Patient" | "Student",
  };

  let auth = decodedJwt ? decodedJwt.roles : "false";
  return auth === "Student" ? <Outlet /> : <Navigate to="/sign_in" />;
};

export default PrivateRoutes;
