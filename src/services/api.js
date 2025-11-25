import axios from "axios";

const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;
const TIMEOUT_API = parseInt(import.meta.env.VITE_TIMEOUT_API, 10) || 60000;

//instance axios
const api = axios.create({
  baseURL: BASE_URL_API,
  timeout: TIMEOUT_API,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status } = error.response;

    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
