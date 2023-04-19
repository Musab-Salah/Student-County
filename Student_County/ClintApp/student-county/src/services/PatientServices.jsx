import axios from "../api/axios";

const PATIENT_API_BASE_URL = "/Patient";

class PatientServices {
  getPatients = async () => await axios.get(PATIENT_API_BASE_URL + "/Index");

  createPatient = async (patient) =>
    await axios.post(PATIENT_API_BASE_URL + "/Create", patient);

  getPatientById = async (patientId) =>
    await axios.get(PATIENT_API_BASE_URL + "/Get/" + patientId);

  updatePatient = async (patientId, patient) =>
    await axios.put(PATIENT_API_BASE_URL + "/Update/" + patientId, patient);

  deletePatient = async (patientId) =>
    await axios.delete(PATIENT_API_BASE_URL + "/Delete/" + patientId);
}
// eslint-disable-next-line
export default new PatientServices();
