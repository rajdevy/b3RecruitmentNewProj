import axios from "axios";

const apiUrl = axios.create({
  baseURL: "http://localhost:62075/api",
});

export default apiUrl;
