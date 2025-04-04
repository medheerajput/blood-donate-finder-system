import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ Vite Proxy will redirect this to the backend
  withCredentials: true, // ✅ Allow sending cookies
});

export default API;
