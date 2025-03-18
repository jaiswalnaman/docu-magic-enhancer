
import axios from 'axios';

// Replace this placeholder with your actual ngrok URL
const BASE_URL = 'https://<your-ngrok-id>.ngrok-free.app';

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
