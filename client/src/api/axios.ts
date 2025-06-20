import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://focusflow.up.railway.app',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance; 