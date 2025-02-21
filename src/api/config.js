// src/config/apiConfig.js

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Update with your actual base URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized. Redirecting to login...");
      // Handle token expiration or unauthorized access
    }
    return Promise.reject(error);
  }
);

// API Endpoints
const api = {
  auth: {
    login: (credentials) => axiosInstance.post("/auth/login", credentials),
    register: (userData) => axiosInstance.post("/auth/signup", userData),
    logout: () => axiosInstance.post("/auth/logout"),
  },

  user: {
    getProfile: () => axiosInstance.get("/user/profile"),
    updateProfile: (data) => axiosInstance.put("/user/profile", data),
  },

  athletes: {
    createPerformance: (athleteId, data) =>
      axiosInstance.post(`/athlete/addPerformance/${athleteId}`, data),
    editPerformance: (athleteId, data) =>
      axiosInstance.put(`/athlete/editPerformance/${athleteId}`, data),
    getPerformances: (athleteId) =>
      axiosInstance.get(`/athlete/getPerformance/${athleteId}`),
    getAllAthletes: (data) => axiosInstance.post(`all/getAllAthletes`, data),
    getAthlete: (athleteId) =>
      axiosInstance.get(`/all/getAthlete/${athleteId}`),
  },

  metrics: {
    getMetricsByAthlete: (athleteId) =>
      axiosInstance.get(`/metrics/${athleteId}`),
    addMetrics: (athleteId, data) =>
      axiosInstance.post(`/metrics/${athleteId}`, data),
  },

  health: {
    getHealthData: (athleteId) => axiosInstance.get(`/health/${athleteId}`),
    updateHealthData: (athleteId, data) =>
      axiosInstance.put(`/health/${athleteId}`, data),
  },
  coaches: {
    getAllCoaches: (data) => axiosInstance.post(`/all/getAllCoaches`, data),
    getLeaderboardStats: (data) =>
      axiosInstance.post(`/all/getLeaderboardStats`, data),
  },
  sponsors: {
    getAllSponsors: (data) => axiosInstance.post(`/all/getAllSponsors`, data),
  },
  connect: {
    sendConnection: (data) =>
      axiosInstance.post(`/connect/send-connection`, data),
  },
};

export default api;
