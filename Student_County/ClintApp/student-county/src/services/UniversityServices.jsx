import axios from "../api/axios";

const UNIVERSITY_API_BASE_URL = "/University";

class UniversityServices {
  async getUniversities() {
    return await axios.get(UNIVERSITY_API_BASE_URL + "/Index");
  }

  async createUniversity(university) {
    return await axios.post(UNIVERSITY_API_BASE_URL + "/Create", university);
  }

  async getUniversityById(universityId) {
    return await axios.get(UNIVERSITY_API_BASE_URL + "/Get" + universityId);
  }

  async updateUniversity(universityId, university) {
    return await axios.put(
      UNIVERSITY_API_BASE_URL + "/Update" + universityId,
      university
    );
  }

  async deleteUniversity(universityId) {
    return await axios.delete(
      UNIVERSITY_API_BASE_URL + "/Delete" + universityId
    );
  }
}
// eslint-disable-next-line
export default new UniversityServices();
