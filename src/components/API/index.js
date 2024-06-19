import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.218.48:3005",
});

export { api };
