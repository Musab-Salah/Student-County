import React, { useState, createContext } from "react";
import AuthServices from "../services/AuthServices/AuthServices";

const AuthCxt = createContext();

export function AuthProvider({ children }) {
  const [isLogout, setIsLogout] = useState(true);
  const [AuthError, setError] = useState("Loading");

  const register = (Bo) => {
    AuthServices.register(Bo)
      .then((res) => {})
      .catch(() => setError("Failed Register"));
  };
  const login = (Bo) => {
    AuthServices.login(Bo)
      .then((response) => {
        console.log("login");
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(localStorage.getItem("user"));
      })
      .catch(() => setError("Failed Login"));
  };

  const refresh = () => {
    AuthServices.refresh()
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(localStorage.getItem("user"));
        return response.data;
      })
      .catch(() => setError("Failed Refresh token"));
  };

  const logout = () => {
    console.log("logout");
    AuthServices.logout()
      .then(() => {
        localStorage.removeItem("user");
        setIsLogout(!isLogout);
        console.log(isLogout);
      })
      .catch(() => {
        console.log("error log");
        setError("Failed Logout");
      });
  };

  return (
    <AuthCxt.Provider
      value={{
        isLogout,
        setIsLogout,
        register,
        login,
        refresh,
        logout,
        AuthError,
      }}
    >
      {children}
    </AuthCxt.Provider>
  );
}
export default AuthCxt;
