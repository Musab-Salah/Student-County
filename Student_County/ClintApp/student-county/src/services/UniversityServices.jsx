import axios from "../api/axios";

const UNIVERSITY_API_BASE_URL = "/University";

class UniversityServices {
  getUniversities = async () =>
    await axios.get(UNIVERSITY_API_BASE_URL + "/Index");

  createUniversity = async (university) =>
    await axios.post(UNIVERSITY_API_BASE_URL + "/Create", university);

  getUniversityById = async (universityId) =>
    await axios.get(UNIVERSITY_API_BASE_URL + "/Get/" + universityId);

  updateUniversity = async (universityId, university) =>
    await axios.put(
      UNIVERSITY_API_BASE_URL + "/Update/" + universityId,
      university
    );

  deleteUniversity = async (universityId) =>
    await axios.delete(UNIVERSITY_API_BASE_URL + "/Delete/" + universityId);
}
// eslint-disable-next-line
export default new UniversityServices();
