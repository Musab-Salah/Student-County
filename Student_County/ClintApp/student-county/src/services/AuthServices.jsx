import axios from "../api/axios";

const API_URL = "/Auth";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

 const  login = async (Bo) => {
  return await axios
    .post(API_URL + "/login", Bo)
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  console.log("in logout")
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
