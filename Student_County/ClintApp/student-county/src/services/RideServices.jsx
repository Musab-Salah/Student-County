import axios from "../api/axios";

const RIDE_API_BASE_URL = "/Ride";

class RideServices {
  getRides = async (token) =>
    await axios.get(RIDE_API_BASE_URL + "/Index", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  getMyAllRides = async (userid, token) =>
    await axios.get(
      RIDE_API_BASE_URL + "/GetMyAllRides?userid=" + userid,
      {
        params: {
          userid: userid,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  createRide = async (ride, token) =>
    await axios.post(RIDE_API_BASE_URL + "/Create", ride, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  getRideById = async (rideId, token) =>
    await axios.get(RIDE_API_BASE_URL + "/Get/" + rideId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  updateRide = async (rideId, ride, token) =>
    await axios.put(RIDE_API_BASE_URL + "/Update/" + rideId, ride, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  deleteRide = async (rideId, token) =>
    await axios.delete(RIDE_API_BASE_URL + "/Delete/" + rideId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
}

// eslint-disable-next-line
export default new RideServices();
