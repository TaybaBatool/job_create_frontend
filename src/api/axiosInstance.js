import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/'; // Replace with your backend URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or AsyncStorage in React Native
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
