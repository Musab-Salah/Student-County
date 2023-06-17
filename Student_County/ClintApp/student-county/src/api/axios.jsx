import axios from "axios";
const BASE_URL = "https://studentcountytestapi.azurewebsites.net/";

axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: BASE_URL,
});
