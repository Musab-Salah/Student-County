import axios from "../api/axios";

const RIDE_API_BASE_URL = "/Ride";

class RideServices {
  getRides = async () => await axios.get(RIDE_API_BASE_URL + "/Index");

  createRide = async (ride) =>
    await axios.post(RIDE_API_BASE_URL + "/Create", ride);

  getRideById = async (rideId) =>
    await axios.get(RIDE_API_BASE_URL + "/Get/" + rideId);

  updateRide = async (rideId, ride) =>
    await axios.put(RIDE_API_BASE_URL + "/Update/" + rideId, ride);

  deleteRide = async (rideId) =>
    await axios.delete(RIDE_API_BASE_URL + "/Delete/" + rideId);
}

// eslint-disable-next-line
export default new RideServices();
