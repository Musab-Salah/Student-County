import React, {
  useState,
  createContext,
  useMemo,
  useContext,
  useEffect,
} from "react";
import AuthServices from "../services/AuthServices/AuthServices";
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

  const [isLogout, setIsLogout] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [AuthError, setError] = useState("Loading");
  const [decodedJwt, setDecodedJwt] = useState();

  let navigate = useNavigate();

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
    //getUniversityById(Bo.universityId);
    // Bo.email = Bo.email + University.emailDomainName;
    AuthServices.register(Bo)
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
        User,
        UserBo,
        AuthError,
        decodedJwt,
      }}
    >
      {children}
    </AuthCxt.Provider>
  );
}
export default AuthCxt;
