import axios from "../api/axios";

const LOCATION_API_BASE_URL = "/Location";

class LocationServices {
  getLocations = async (token) =>
    await axios.get(LOCATION_API_BASE_URL + "/Index", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  createLocation = async (location, token) =>
    await axios.post(LOCATION_API_BASE_URL + "/Create", location, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  getLocationById = async (locationId, token) =>
    await axios.get(LOCATION_API_BASE_URL + "/Get/" + locationId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  updateLocation = async (locationId, location, token) =>
    await axios.put(LOCATION_API_BASE_URL + "/Update/" + locationId, location, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  deleteLocation = async (locationId, token) =>
    await axios.delete(LOCATION_API_BASE_URL + "/Delete/" + locationId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
}
// eslint-disable-next-line
export default new LocationServices();
