import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('av_admin_access_token') || localStorage.getItem('av_admin_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      // If auth/login, auth/refresh, or auth/me fails with 401, clear storage and do not attempt retry
      if (
        originalRequest.url.includes('/auth/login') ||
        originalRequest.url.includes('/auth/refresh') ||
        originalRequest.url.includes('/auth/me')
      ) {
        localStorage.removeItem('av_admin_access_token');
        localStorage.removeItem('av_admin_token');
        localStorage.removeItem('av_admin_refresh_token');
        localStorage.removeItem('av_admin_user');
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('av_admin_refresh_token');

      if (!refreshToken) {
        isRefreshing = false;
        localStorage.clear();
        if (window.location.pathname !== '/admin/login') {
          window.location.href = '/admin/login';
        }
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });

        if (res.data.success && res.data.accessToken) {
          const newAccessToken = res.data.accessToken;
          const newRefreshToken = res.data.refreshToken;

          localStorage.setItem('av_admin_access_token', newAccessToken);
          localStorage.setItem('av_admin_token', newAccessToken);
          if (newRefreshToken) {
            localStorage.setItem('av_admin_refresh_token', newRefreshToken);
          }

          api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          processQueue(null, newAccessToken);
          return api(originalRequest);
        }
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        localStorage.clear();
        if (window.location.pathname !== '/admin/login') {
          window.location.href = '/admin/login';
        }
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
