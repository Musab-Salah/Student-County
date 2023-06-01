import axios from "../api/axios";

const BOOK_API_BASE_URL = "/Chat";

class ChatServices {
  getMyAllChats = async (userid, token) =>
    await axios.get(BOOK_API_BASE_URL + "/GetMyAllChats?userid=" + userid, {
      params: {
        userid: userid,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  deleteChat = async (userid, roomid, token) =>
    await axios.delete(
      BOOK_API_BASE_URL + "/Delete?userid=" + userid + "&roomid=" + roomid,
      null,
      {
        params: {
          userid: userid,
          roomid: roomid,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
}
// eslint-disable-next-line
export default new ChatServices();
