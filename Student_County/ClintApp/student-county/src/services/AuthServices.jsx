import axios from "../api/axios";

const API_URL = "/Auth";

class AuthServices {
  async studentRegister(Bo) {
    return await axios.post(API_URL + "/StudentRegister", Bo);
  }

  async patientRegister(Bo) {
    return await axios.post(API_URL + "/PatientRegister", Bo);
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

  async getRoles() {
    return await axios.get(API_URL + "/GetRoles");
  }
}
// eslint-disable-next-line
export default new AuthServices();
