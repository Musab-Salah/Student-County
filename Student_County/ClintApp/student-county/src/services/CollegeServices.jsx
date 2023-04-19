import axios from "../api/axios";

const COLLEGE_API_BASE_URL = "/College";

class CollegeServices {
  getColleges = async () => await axios.get(COLLEGE_API_BASE_URL + "/Index");

  createCollege = async (college) =>
    await axios.post(COLLEGE_API_BASE_URL + "/Create", college);

  getCollegeById = async (collegeId) =>
    await axios.get(COLLEGE_API_BASE_URL + "/Get/" + collegeId);

  updateCollege = async (collegeId, college) =>
    await axios.put(COLLEGE_API_BASE_URL + "/Update/" + collegeId, college);

  deleteCollege = async (collegeId) =>
    await axios.delete(COLLEGE_API_BASE_URL + "/Delete/" + collegeId);
}
// eslint-disable-next-line
export default new CollegeServices();
