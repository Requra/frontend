import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const API_BASE_URL = "http://127.0.0.1:3658/m1/1212435-1208182-default";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------------------------------------------------------------------------
// REQUEST interceptor — attach token from Zustand memory to every request
// ---------------------------------------------------------------------------
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------------------------------------------------------------------
// RESPONSE interceptor — handle 401 globally → clear auth state
// ---------------------------------------------------------------------------
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
