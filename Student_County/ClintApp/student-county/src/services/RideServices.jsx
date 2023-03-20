import axios from "../api/axios";

const RIDE_API_BASE_URL = "/Ride";

class RideServices {
  async getRides() {
    return await axios.get(RIDE_API_BASE_URL + "/Index");
  }

  async createRide(ride) {
    return await axios.post(RIDE_API_BASE_URL + "/Create", ride);
  }

  async getRideById(rideId) {
    return await axios.get(RIDE_API_BASE_URL + "/Get" + rideId);
  }

  async updateRide(rideId, ride) {
    return await axios.put(RIDE_API_BASE_URL + "/Update" + rideId, ride);
  }

  async deleteRide(rideId) {
    return await axios.delete(RIDE_API_BASE_URL + "/Delete" + rideId);
  }
}
// eslint-disable-next-line
export default new RideServices();
