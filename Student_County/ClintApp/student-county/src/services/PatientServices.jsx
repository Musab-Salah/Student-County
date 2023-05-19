import axios from "../api/axios";

const PATIENT_API_BASE_URL = "/Patient";

class PatientServices {
  getPatients = async (token) =>
    await axios.get(PATIENT_API_BASE_URL + "/Index", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  getMyAllPatients = async (userid, token) =>
    await axios.get(
      PATIENT_API_BASE_URL + "/GetMyAllPatients?userid=" + userid,
      {
        params: {
          userid: userid,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  createPatient = async (patient, token) =>
    await axios.post(PATIENT_API_BASE_URL + "/Create", patient, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  getPatientById = async (patientId, token) =>
    await axios.get(PATIENT_API_BASE_URL + "/Get/" + patientId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  updatePatient = async (patientId, patient, token) =>
    await axios.put(PATIENT_API_BASE_URL + "/Update/" + patientId, patient, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  deletePatient = async (patientId, token) =>
    await axios.delete(PATIENT_API_BASE_URL + "/Delete/" + patientId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
}
// eslint-disable-next-line
export default new PatientServices();
