import axios from "axios";
const BASE_URL = "https://localhost:7245/";
// https://localhost:7245/
// https://studentcountytestapi.azurewebsites.net/
axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: BASE_URL,
});
