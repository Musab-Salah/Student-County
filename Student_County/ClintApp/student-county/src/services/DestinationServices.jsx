import axios from "../api/axios";

const DESTINATION_API_BASE_URL = "/Destination";

class DestinationServices {
  getDestinations = async () =>
    await axios.get(DESTINATION_API_BASE_URL + "/Index");

  createDestination = async (destination) =>
    await axios.post(DESTINATION_API_BASE_URL + "/Create", destination);

  getDestinationById = async (destinationId) =>
    await axios.get(DESTINATION_API_BASE_URL + "/Get/" + destinationId);

  updateDestination = async (destinationId, destination) =>
    await axios.put(
      DESTINATION_API_BASE_URL + "/Update/" + destinationId,
      destination
    );

  deleteDestination = async (destinationId) =>
    await axios.delete(DESTINATION_API_BASE_URL + "/Delete/" + destinationId);
}
// eslint-disable-next-line
export default new DestinationServices();
