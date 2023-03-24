import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = () => {
  const { decodedJwt } = useAuth();

  let auth = decodedJwt ? decodedJwt.roles : "false";
  return auth === "DentistryStudent" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
