import axios from "../api/axios";

const USERS_URL = "/Auth";

class UsersServices {
  async register(user) {
    debugger
    return await axios.post(USERS_URL + "/register", user);
  }
}
// eslint-disable-next-line
export default new UsersServices();
