import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (bo) => {
    await axios
      .post("https://localhost:7245/Auth/login", bo)
      .then((response) => {
        let data = response.data;
        console.log("in sdfsdf");
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        navigate("/");
      })
      .catch((res) => {
        console.log("in else");
      });
  };

  const logoutUser = () => {
    console.log("in logout");
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };

  // let updateToken = async ()=> {

  //     let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
  //         method:'POST',
  //         headers:{
  //             'Content-Type':'application/json'
  //         },
  //         body:JSON.stringify({'refresh':authTokens?.refresh})
  //     })

  //     let data = await response.json()

  //     if (response.status === 200){
  //         setAuthTokens(data)
  //         setUser(jwt_decode(data.access))
  //         localStorage.setItem('authTokens', JSON.stringify(data))
  //     }else{
  //         logoutUser()
  //     }

  //     if(loading){
  //         setLoading(false)
  //     }
  // }

  const contextData = {
    user: user,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    console.log("in eff");
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
}
