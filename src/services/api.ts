import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:3658/m1/1212435-1208182-default";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

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
// RESPONSE interceptor — handle 401 globally with silent refresh fallback
// ---------------------------------------------------------------------------
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const currentRefreshToken = useAuthStore.getState().refreshToken;

      if (!currentRefreshToken) {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }

      try {
        // Use a clean axios instance to avoid circular interceptors
        const response = await axios.post(`${API_BASE_URL}/api/Auth/token/refresh`, {
          refreshToken: currentRefreshToken,
        });

        const resData = response.data;
        const token = resData?.data?.token || resData?.token;
        const newRefreshToken = resData?.data?.refreshToken || resData?.refreshToken;

        if (token && newRefreshToken) {
          useAuthStore.getState().setTokens(token, newRefreshToken);
          apiClient.defaults.headers.common["Authorization"] = "Bearer " + token;
          originalRequest.headers.Authorization = "Bearer " + token;
          processQueue(null, token);
          return apiClient(originalRequest);
        } else {
          throw new Error("Invalid refresh token structure");
        }
      } catch (err) {
        processQueue(err, null);
        useAuthStore.getState().logout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
