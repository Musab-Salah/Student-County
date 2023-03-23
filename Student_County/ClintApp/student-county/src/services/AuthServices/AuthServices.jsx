import axios from "../../api/axios";

const API_URL = "/Auth";

class AuthServices {
  async register(Bo) {
    return await axios.post(API_URL + "/register", Bo);
  }

  async login(Bo) {
    return await axios.post(API_URL + "/login", Bo);
  }

  async refresh() {
    console.log("refresh");
    return await axios.get(API_URL + "/refreshToken", {
      withCredentials: true,
    });
  }

  async logout() {
    return await axios.post(API_URL + "/revokeToken");
  }

  async getCurrentUser() {
    return JSON.parse(localStorage.getItem("user")); // need to check
  }
}

export default new AuthServices();
