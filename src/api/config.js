// src/config/apiConfig.js

import axios from 'axios';
import { get } from 'react-scroll/modules/mixins/scroller';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Update with your actual base URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 90000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
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
      console.error('Unauthorized. Redirecting to login...');
      // Handle token expiration or unauthorized access
    }
    return Promise.reject(error);
  }
);

// API Endpoints
const api = {
  auth: {
    login: (credentials) => axiosInstance.post('/auth/login', credentials),
    register: (userData) => axiosInstance.post('/auth/signup', userData),
    logout: () => axiosInstance.post('/auth/logout'),
  },

  user: {
    getProfile: () => axiosInstance.get('/user/profile'),
    updateProfile: (data) => axiosInstance.put('/user/profile', data),
    getMessage: (userId, question) =>
      axiosInstance.post('suggestion/chat/', { userId, question }),
    uploadProfilePicture: (userId, data) =>
      axiosInstance.post(`upload/profilePic/${userId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    getProfilePhoto: (userId, data) =>
      axiosInstance.post(`/upload/getProfilePic/${userId}`, data),
    getAllUsers: () => axiosInstance.get('/all/getAllUsers'),
  },

  athletes: {
    createPerformance: (athleteId, data) =>
      axiosInstance.post(`/athlete/addPerformance/${athleteId}`, data),
    editPerformance: (athleteId, data) =>
      axiosInstance.put(`/athlete/editPerformance/${athleteId}`, data),
    getPerformances: (athleteId) =>
      axiosInstance.get(`/athlete/getPerformance/${athleteId}`),
    addHealthcare: (athleteId, data) =>
      axiosInstance.post(`/healthcare/addHealthcare/${athleteId}`, data),
    editHealthcare: (athleteId, data) =>
      axiosInstance.put(`/healthcare/editHealthcare/${athleteId}`, data),
    getHealthcareDetails: (athleteId) =>
      axiosInstance.get(`/healthcare/getHealthcareDetails/${athleteId}`),
    addDietary: (athleteId, data) =>
      axiosInstance.post(`/dietary/addDietary/${athleteId}`, data),
    editDietary: (athleteId, data) =>
      axiosInstance.put(`/dietary/editDietary/${athleteId}`, data),
    getDietary: (athleteId) =>
      axiosInstance.get(`/dietary/getDietary/${athleteId}`),
    getAllAthletes: (data) => axiosInstance.post(`all/getAllAthletes`, data),
    getAthlete: (athleteId) =>
      axiosInstance.get(`/all/getAthlete/${athleteId}`),
    getPerformanceSuggestions: (athleteId) =>
      axiosInstance.get(`/suggestion/performance/${athleteId}`),
    getDietarySuggestions: (athleteId) =>
      axiosInstance.get(`/suggestion/dietary/${athleteId}`),
    getHealthcareSuggestions: (athleteId) =>
      axiosInstance.get(`/suggestion/healthcare/${athleteId}`),
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
  video_analysis: {
    postVideo: (id, videoFile) => {
      const formData = new FormData();
      formData.append('video', videoFile);

      return axiosInstance.post(`/athlete/videoAnalysis/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 500000,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload Progress: ${percentCompleted}%`);
        },
      });
    },
    getVideoAnalysis: (id) =>
      axiosInstance.get(`athlete/getVideoPerformanceAnalysis/${id}`),
  },
  chat: {
    getMessages: (user1, user2) => axiosInstance.get(`/chat/${user1}/${user2}`),
    sendMessage: (data) => axiosInstance.post(`/chat/send`, data),
  },
  connect: {
    sendConnection: (data) =>
      axiosInstance.post(`/connect/send-connection`, data),
    getConnections: (id) => axiosInstance.get(`/connect/connections/${id}`),
    handleConnections: (payload) => {
      return axiosInstance.post(`/connect/handle-connection`, payload);
    },
  },
};

export default api;
