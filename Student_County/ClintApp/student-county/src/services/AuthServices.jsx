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

  confirmEmail = async (Bo) => await axios.post(API_URL + "/ConfirmEmail", Bo);

  forgetPassword = async (Bo) =>
    await axios.post(API_URL + "/ForgetPassword", null, {
      params: {
        email: Bo,
      },
    });

  resetPassword = async (Bo) =>
    await axios.post(API_URL + "/ResetPassword", Bo);
}
// eslint-disable-next-line
export default new AuthServices();
