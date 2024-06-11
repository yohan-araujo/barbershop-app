import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.34.89:3005",
});

export { api };
