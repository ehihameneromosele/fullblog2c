// src/axios.js
import axios from "axios";

// ✅ CORRECT: Base URL points to your Django API root
const api = axios.create({
  baseURL: 'https://blogbackc-ch.onrender.com/api/', // This is correct
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// ... rest of your axios.js code remains the same
api.interceptors.request.use(
  (config) => {
    // Normalize the url we're calling
    const base = config.baseURL || "";
    const url = new URL(config.url, base).toString();

    // ✅ Do NOT attach Authorization to login or token refresh
    const skipAuth = url.includes('/login/') || url.includes('/token/refresh/');
    if (!skipAuth) {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Centralized refresh logic
async function refreshToken() {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) return null;

  try {
    const { data } = await axios.post(
      'https://blogbackc-ch.onrender.com/api/token/refresh/', // ✅ Correct URL
      { refresh }
    );
    localStorage.setItem("access_token", data.access);
    if (data.refresh) localStorage.setItem("refresh_token", data.refresh);
    return data.access;
  } catch (err) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    return null;
  }
}

// Response interceptor → refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;