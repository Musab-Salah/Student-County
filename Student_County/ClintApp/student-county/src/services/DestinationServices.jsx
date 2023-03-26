import axios from "../api/axios";

const DESTINATION_API_BASE_URL = "/Destination";

class DestinationServices {
  async getDestinations() {
    return await axios.get(DESTINATION_API_BASE_URL + "/Index");
  }

  async createDestination(destination) {
    return await axios.post(DESTINATION_API_BASE_URL + "/Create", destination);
  }

  async getDestinationById(destinationId) {
    return await axios.get(DESTINATION_API_BASE_URL + "/Get/" + destinationId);
  }

  async updateDestination(destinationId, destination) {
    return await axios.put(
      DESTINATION_API_BASE_URL + "/Update/" + destinationId,
      destination
    );
  }

  async deleteDestination(destinationId) {
    return await axios.delete(
      DESTINATION_API_BASE_URL + "/Delete/" + destinationId
    );
  }
}
// eslint-disable-next-line
export default new DestinationServices();
