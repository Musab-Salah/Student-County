import axios from "../api/axios";

const BOOK_API_BASE_URL = "/UserRelationData";

class UserRelationDataServices {
  getMyAllData = async (userid, token) =>
    await axios.get(BOOK_API_BASE_URL + "/GetMyAllData?userid=" + userid, {
      params: {
        userid: userid,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  getAllRecentActivity = async (userid, token) =>
    await axios.get(
      BOOK_API_BASE_URL + "/GetAllRecentActivity?userid=" + userid,
      {
        params: {
          userid: userid,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
}
// eslint-disable-next-line
export default new UserRelationDataServices();
