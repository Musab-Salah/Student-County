import axios from "../api/axios";

const API_URL = "/Auth";

class AuthServices {
  studentRegister = async (Bo) =>
    await axios.post(API_URL + "/StudentRegister", Bo);

  patientRegister = async (Bo) =>
    await axios.post(API_URL + "/PatientRegister", Bo);

  login = async (Bo) => await axios.post(API_URL + "/login", Bo);

  refresh = async () =>
    await axios.get(API_URL + "/refreshToken", {
      withCredentials: true,
    });

  logout = async () => await axios.post(API_URL + "/revokeToken");

  getRoles = async () => await axios.get(API_URL + "/GetRoles");

  confirmEmail = async () => await axios.get(API_URL + "/ConfirmEmail");

  forgetPassword = async () => await axios.get(API_URL + "/ForgetPassword");

  resetPassword = async () => await axios.get(API_URL + "/ResetPassword");
}
// eslint-disable-next-line
export default new AuthServices();
