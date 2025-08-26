import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // NestJS will run on port 3000
});

export default api;
