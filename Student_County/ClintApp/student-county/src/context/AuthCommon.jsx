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
  const [AuthError, setError] = useState("");
  const [decodedJwt, setDecodedJwt] = useState(false);
  const [Roles, setRoles] = useState();
  const [SendEmailResetPass, setSendEmailResetPass] = useState(false);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let navigate = useNavigate();

  const [isSuccessfully, setSuccessfully] = useState(false);
  const [userInLocal, setUserInLocal] = useState();

  const [StudentBo] = useState({
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

  const [PationtBo] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserInLocal(user);
    if (user) {
      const decodedJwt = parseJwt(user.token);
      setDecodedJwt(decodedJwt);
      const dexp = decodedJwt.exp * 1000;
      if (dexp > Date.now()) {
        setIsLogin(true);
        navigate("/dashboard");
      } else localStorage.clear("user");
    }
    // eslint-disable-next-line
  }, []);

  const studentRegister = (Bo) => {
    getUniversityById(Bo.universityId);
    Bo.email = Bo.email + University.emailDomainName;
    AuthServices.studentRegister(Bo)
      .then((res) => {
        setSuccessfully(true);
        setError(null);
        sleep(5000).then(() => {
          setSuccessfully(false);
          navigate("/sign_in");
        });
      })
      .catch((res) => {
        setError(res.response.data);
        navigate("/sign_up");
      });
  };

  const patientRegister = (Bo) => {
    AuthServices.patientRegister(Bo)
      .then((res) => {
        setSuccessfully(true);
        setError(null);
        sleep(5000).then(() => {
          setSuccessfully(false);
          navigate("/sign_in");
        });
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
        setError("");
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
        setRoles(res.data);
      })
      .catch(() => {
        setError("Failed bring the Roles");
      });
  };

  const forgetPassword = (Bo) => {
    AuthServices.forgetPassword(Bo)
      .then((res) => {
        setError(null);
        setSendEmailResetPass(true);
        sleep(5000).then(() => {
          setSendEmailResetPass(false);
        });
      })
      .catch((res) => {
        setError(res.response.data);
        setSendEmailResetPass(false);
        navigate("/forgot_password");
      });
  };
  const resetPassword = (Bo) => {
    AuthServices.resetPassword(Bo)
      .then((res) => {
        setError(null);
        setSendEmailResetPass(true);
        sleep(5000).then(() => {
          setSendEmailResetPass(false);
          navigate("/sign_in");
        });
      })
      .catch((res) => {
        setError(res.response.data);
        setSendEmailResetPass(false);
        navigate("/reset_password");
      });
  };

  return (
    <AuthCxt.Provider
      value={{
        isLogout,
        isLogin,
        setIsLogout,
        studentRegister,
        patientRegister,
        resetPassword,
        login,
        refresh,
        logout,
        getRoles,
        forgetPassword,
        isSuccessfully,
        Roles,
        StudentBo,
        PationtBo,
        AuthError,
        decodedJwt,
        userInLocal,
        SendEmailResetPass,
      }}
    >
      {children}
    </AuthCxt.Provider>
  );
}
export default AuthCxt;
