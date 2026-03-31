import { apiClient } from "@/services/api";
import type { LoginCredentials, ApiLoginResponse } from "../types";

export const loginWithEmailAndPassword = async (
  data: LoginCredentials
): Promise<ApiLoginResponse> => {
  const response = await apiClient.post<ApiLoginResponse>("/api/Auth/login", {
    email: data.email,
    password: data.password,
  });

  return response.data;
};
