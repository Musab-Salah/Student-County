import React, { createContext, useEffect, useState, useContext } from "react";
import UsersServices from "../services/UsersServices";
import { useNavigate } from "react-router";
import UniversitiesCxt from "./UniversityCommon";

const UsersCxt = createContext();

export function UsersProvider({ children }) {
  const { getUniversityById, University } = useContext(UniversitiesCxt);

  const [UserError, setError] = useState();
  const [User, setUser] = useState("Loading");
  const [UserBo] = useState({
    firstName: "",
    lastName: "",
    idNumber: 0,
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    universityId: "",
    collegeId: "",
  });

  let navigate = useNavigate();

  useEffect(() => {}, []);

  const createUser = (Bo) => {
    getUniversityById(Bo.universityId);
    Bo.email = Bo.email + University.emailDomainName;
    UsersServices.register(Bo)
      .then((res) => {
        setUser(res.data);
        console.log(res);
        setError(null);
        navigate("/");
      })
      .catch((res) => {
        setError(res.response.data);
        //console.log(res.response.data);
        navigate("/sign_up");
      });
  };

  return (
    <UsersCxt.Provider
      value={{
        User,
        UserBo,
        UserError,
        createUser,
      }}
    >
      {children}
    </UsersCxt.Provider>
  );
}

export default UsersCxt;
