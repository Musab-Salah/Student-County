import axios from "../api/axios";

const PATIENT_API_BASE_URL = "/Patient";

class PatientServices {
  async getPatients() {
    return await axios.get(PATIENT_API_BASE_URL + "/Index");
  }

  async createPatient(patient) {
    return await axios.post(PATIENT_API_BASE_URL + "/Create", patient);
  }

  async getPatientById(patientId) {
    return await axios.get(PATIENT_API_BASE_URL + "/Get" + patientId);
  }

  async updatePatient(patientId, patient) {
    return await axios.put(
      PATIENT_API_BASE_URL + "/Update" + patientId,
      patient
    );
  }

  async deletePatient(patientId) {
    return await axios.delete(PATIENT_API_BASE_URL + "/Delete" + patientId);
  }
}
// eslint-disable-next-line
export default new PatientServices();
