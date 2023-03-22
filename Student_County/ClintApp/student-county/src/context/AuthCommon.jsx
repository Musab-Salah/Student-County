import React, {
  useState,
  createContext,
  useMemo,
  useRef,
  useEffect,
} from "react";
import AuthServices from "../services/AuthServices/AuthServices";
import { useNavigate } from "react-router-dom";

const AuthCxt = createContext();

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [isLogout, setIsLogout] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [AuthError, setError] = useState("Loading");
  const [decodedJwt, setDecodedJwt] = useState();

  let navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const decodedJwt = parseJwt(user.token);
      const dexp = decodedJwt.exp * 1000;
      if (dexp > Date.now()) setIsLogin(!isLogin);
      else localStorage.clear("user");
    }
  }, []);
  useMemo(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const decodedJwt = parseJwt(user.token);
    }
    setDecodedJwt(decodedJwt);
  }, []);

  const register = (Bo) => {
    AuthServices.register(Bo)
      .then((res) => {})
      .catch(() => setError("Failed Register"));
  };
  const login = (Bo) => {
    AuthServices.login(Bo)
      .then((response) => {
        setIsLogin(!isLogin);
        console.log("login");
        localStorage.setItem("user", JSON.stringify(response.data));
        // console.log(localStorage.getItem("user"));
        navigate("/dashboard");
      })
      .catch(() => setError("Failed Login"));
  };

  const refresh = () => {
    AuthServices.refresh()
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        // console.log(localStorage.getItem("user"));
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
        setIsLogin(!isLogin);
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
        isLogin,
        setIsLogout,
        register,
        login,
        refresh,
        logout,
        AuthError,
        decodedJwt,
      }}
    >
      {children}
    </AuthCxt.Provider>
  );
}
export default AuthCxt;
