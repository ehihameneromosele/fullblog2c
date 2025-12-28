// src/api/auth.js
import api from "./axios";
import {
  LOGIN_URL,
  REGISTER_URL,
  TOKEN_REFRESH_URL,
} from "./config.js";

// --- Register ---
export const register = async (userData) => {
  const response = await api.post(REGISTER_URL, userData);
  return response.data;
};

// --- Login ---
export const login = async (credentials) => {
  const response = await api.post(LOGIN_URL, {
    username: credentials.username || credentials.email,
    password: credentials.password,
  });

  const { access, refresh, user } = response.data;
  if (access) {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    localStorage.setItem("user", JSON.stringify(user || {}));
  }
  return { access, refresh, user };
};

// --- Logout ---
export const logout = () => {
  localStorage.clear();
};

// --- Current User ---
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

// --- Token Refresh ---
export const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) return null;

  try {
    const response = await api.post(TOKEN_REFRESH_URL, { refresh });
    const { access } = response.data;

    if (access) {
      localStorage.setItem("access_token", access);
    }

    return access;
  } catch (error) {
    console.error("Token refresh failed:", error);
    logout();
    return null;
  }
};
