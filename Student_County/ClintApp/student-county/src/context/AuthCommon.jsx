import React, { useState, createContext, useEffect } from "react";
import AuthServices from "../services/AuthServices";
import { useNavigate } from "react-router-dom";
import useUniversities from "../hooks/useUniversities";
const AuthCxt = createContext();

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export function AuthProvider({ children }) {
  const { getUniversityById, University } = useUniversities();
  const [isLogout, setIsLogout] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [AuthError, setError] = useState("Loading");
  const [decodedJwt, setDecodedJwt] = useState(false);
  const [Roles, setRoles] = useState();


  let navigate = useNavigate();

  const [User, setUser] = useState("Loading");
  const [userInLocal, setUserInLocal] = useState();

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

  useEffect(() => {
    getRoles();
    const user = JSON.parse(localStorage.getItem("user"));
    setUserInLocal(user);
    if (user) {
      const decodedJwt = parseJwt(user.token);
      setDecodedJwt(decodedJwt);
      const dexp = decodedJwt.exp * 1000;
      if (dexp > Date.now()) setIsLogin(!isLogin);
      else localStorage.clear("user");
    }
    // eslint-disable-next-line
  }, []);

  const register = (Bo) => {
    getUniversityById(Bo.universityId);
    Bo.email = Bo.email + University.emailDomainName;
    AuthServices.register(Bo)
      .then((res) => {
        setUser(res.data);
        setError(null);
        navigate("/");
      })
      .catch((res) => {
        setError(res.response.data);
        navigate("/sign_up");
      });
  };
  const login = (Bo) => {
    AuthServices.login(Bo)
      .then((response) => {
        setIsLogin(true);
        setIsLogout(false);
        localStorage.setItem("user", JSON.stringify(response.data));
        setUserInLocal(response.data);
        const decodedJwt = parseJwt(response.data.token);
        setDecodedJwt(decodedJwt);
        navigate("/dashboard");
      })
      .catch(() => setError("Failed Login"));
  };

  const refresh = () => {
    AuthServices.refresh()
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      })
      .catch(() => setError("Failed Refresh token"));
  };

  const logout = () => {
    AuthServices.logout()
      .then(() => {
        localStorage.removeItem("user");
        setDecodedJwt(false);
        setIsLogout(true);
        setIsLogin(false);
        navigate("/login");
      })
      .catch(() => {
        setError("Failed Logout");
      });
  };
  const getRoles = () => {
    AuthServices.getRoles()
      .then((res) => {
        setRoles(res.data)   
      })
      .catch(() => {
        setError("Failed bring the Roles");
      });
  };

  return (
    <AuthCxt.Provider
      value={{
        isLogout,
        isLogin,
        setIsLogout,
        register,
        login,
        refresh,
        logout,
        User,
        Roles,
        UserBo,
        AuthError,
        decodedJwt,
        userInLocal,
      }}
    >
      {children}
    </AuthCxt.Provider>
  );
}
export default AuthCxt;
