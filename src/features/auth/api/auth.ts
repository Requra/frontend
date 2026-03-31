import { apiClient } from "@/services/api";
import type { ApiLoginResponse } from "../types";
import type { LoginCredentials } from "../schemas/loginSchema";

export const loginWithEmailAndPassword = async (
  data: LoginCredentials,
): Promise<ApiLoginResponse> => {
  const response = await apiClient.post<ApiLoginResponse>("/api/Auth/login", {
    email: data.email,
    password: data.password,
  });

  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  await apiClient.get("/api/Auth/logout");
};
