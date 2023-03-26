import axios from "../api/axios";

const HOUSING_API_BASE_URL = "/Housing";

class HousingServices {
  async getHousings() {
    return await axios.get(HOUSING_API_BASE_URL + "/Index");
  }

  async createHousing(housing) {
    return await axios.post(HOUSING_API_BASE_URL + "/Create", housing);
  }

  async getHousingById(housingId) {
    return await axios.get(HOUSING_API_BASE_URL + "/Get/" + housingId);
  }

  async updateHousing(housingId, housing) {
    return await axios.put(
      HOUSING_API_BASE_URL + "/Update/" + housingId,
      housing
    );
  }

  async deleteHousing(housingId) {
    return await axios.delete(HOUSING_API_BASE_URL + "/Delete/" + housingId);
  }
}
// eslint-disable-next-line
export default new HousingServices();
