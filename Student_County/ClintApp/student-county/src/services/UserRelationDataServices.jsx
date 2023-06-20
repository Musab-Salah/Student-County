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

  getUser = async (userid, token) =>
    await axios.get(BOOK_API_BASE_URL + "/GetUser?userid=" + userid, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  updateUser = async (userid, user, token) =>
    await axios.put(BOOK_API_BASE_URL + "/UpdateUser/" + userid, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
}
// eslint-disable-next-line
export default new UserRelationDataServices();
