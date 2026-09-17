import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach token
axiosClient.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem('career_auth_state');
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        const token = parsed?.state?.accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (err) {
        console.error('Failed to parse auth token:', err);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle token refresh
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      error.response?.data?.code === 'TOKEN_EXPIRED' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const authData = localStorage.getItem('career_auth_state');
        if (authData) {
          const parsed = JSON.parse(authData);
          const refreshToken = parsed?.state?.refreshToken;
          if (refreshToken) {
            const res = await axios.post(`${API_BASE_URL}/auth/refresh`, {
              refreshToken,
            });
            const { accessToken, refreshToken: newRefreshToken } = res.data;
            parsed.state.accessToken = accessToken;
            parsed.state.refreshToken = newRefreshToken;
            localStorage.setItem('career_auth_state', JSON.stringify(parsed));
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axiosClient(originalRequest);
          }
        }
      } catch (refreshErr) {
        localStorage.removeItem('career_auth_state');
        window.location.href = '/auth?mode=login';
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
