import axios from "axios";
const BASE_URL = "https://downtime-monitor-api.onrender.com/";

export default axios.create({
  baseURL: BASE_URL,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});
