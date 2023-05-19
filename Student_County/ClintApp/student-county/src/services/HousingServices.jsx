import axios from "../api/axios";

const HOUSING_API_BASE_URL = "/Housing";

class HousingServices {
  getHousings = async (token) =>
    await axios.get(HOUSING_API_BASE_URL + "/Index", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  getMyAllHousings = async (userid, token) =>
    await axios.get(
      HOUSING_API_BASE_URL + "/GetMyAllHousings?userid=" + userid,
      {
        params: {
          userid: userid,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  createHousing = async (housing, token) =>
    await axios.post(HOUSING_API_BASE_URL + "/Create", housing, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  getHousingById = async (housingId, token) =>
    await axios.get(HOUSING_API_BASE_URL + "/Get/" + housingId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  updateHousing = async (housingId, housing, token) =>
    await axios.put(HOUSING_API_BASE_URL + "/Update/" + housingId, housing, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  deleteHousing = async (housingId, token) =>
    await axios.delete(HOUSING_API_BASE_URL + "/Delete/" + housingId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
}
// eslint-disable-next-line
export default new HousingServices();
