
import axios from 'axios';

const BASE_URL = 'https://9ef9-35-204-132-84.ngrok-free.app/';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.error || 'An unknown error occurred';
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

export default apiClient;

