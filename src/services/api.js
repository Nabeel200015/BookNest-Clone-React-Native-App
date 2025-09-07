import { API_URL } from '@env';
import axios from 'axios';
import { getToken } from '../utils/storage';

const booknest = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor → attach token automatically if available
booknest.interceptors.request.use(
  async config => {
    try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Attaching token:', token);
      }
    } catch (error) {
      console.log('Error attaching token:', error);
    }
    return config;
  },
  error => Promise.reject(error),
);

export default booknest;
