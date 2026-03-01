import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-resume-2-tcdu.onrender.com", // backend URL
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;