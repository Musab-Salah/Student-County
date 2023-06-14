import axios from "../api/axios";

const LOCATION_API_BASE_URL = "/Location";

class LocationServices {
  getLocations = async () =>
    await axios.get(LOCATION_API_BASE_URL + "/Index");

  createLocation = async (location) =>
    await axios.post(LOCATION_API_BASE_URL + "/Create", location);

  getLocationById = async (locationId) =>
    await axios.get(LOCATION_API_BASE_URL + "/Get/" + locationId);

  updateLocation = async (locationId, location) =>
    await axios.put(
      LOCATION_API_BASE_URL + "/Update/" + locationId,
      location
    );

  deleteLocation = async (locationId) =>
    await axios.delete(LOCATION_API_BASE_URL + "/Delete/" + locationId);
}
// eslint-disable-next-line
export default new LocationServices();
