import axios from "axios";
const BASE_URL = "https://localhost:7245";

axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: BASE_URL,
});
