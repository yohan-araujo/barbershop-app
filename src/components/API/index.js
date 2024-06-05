import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.114.48:3005",
});

export default api;
