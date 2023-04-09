import React from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const UserDashboard = () => {
  const { logout } = useAuth();

  let navigate = useNavigate();

  return (
    <>

    </>
  );
};

export default UserDashboard;
