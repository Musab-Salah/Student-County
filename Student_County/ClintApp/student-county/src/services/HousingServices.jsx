import axios from "../api/axios";

const HOUSING_API_BASE_URL = "/Housing";

class HousingServices {
  getHousings = async () => await axios.get(HOUSING_API_BASE_URL + "/Index");

  createHousing = async (housing) =>
    await axios.post(HOUSING_API_BASE_URL + "/Create", housing);

  getHousingById = async (housingId) =>
    await axios.get(HOUSING_API_BASE_URL + "/Get/" + housingId);

  updateHousing = async (housingId, housing) =>
    await axios.put(HOUSING_API_BASE_URL + "/Update/" + housingId, housing);

  deleteHousing = async (housingId) =>
    await axios.delete(HOUSING_API_BASE_URL + "/Delete/" + housingId);
}
// eslint-disable-next-line
export default new HousingServices();
