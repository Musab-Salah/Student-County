import { Outlet, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = () => {
  const { decodedJwt } = useAuth();

  const scopes = ["Dentistry Student", "Patient", "Student"];

  let auth = decodedJwt ? decodedJwt.roles : "";
  return scopes.includes(auth) ? <Outlet /> : <Navigate to="/sign_in" />;
};

export default PrivateRoutes;
