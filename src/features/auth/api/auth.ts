import { apiClient } from "@/services/api";
import type { ApiLoginResponse, ApiRegisterResponse, ApiConfirmResponse } from "../types";
import type { LoginCredentials } from "../schemas/loginSchema";
import type { RegisterCredentials } from "../schemas/registerSchema";

export const loginWithEmailAndPassword = async (
  data: LoginCredentials,
): Promise<ApiLoginResponse> => {
  const response = await apiClient.post<ApiLoginResponse>("/api/Auth/login", {
    email: data.email,
    password: data.password,
  });

  return response.data;
};

export const registerUser = async (
  data: RegisterCredentials
): Promise<ApiRegisterResponse> => {
  const response = await apiClient.post<ApiRegisterResponse>("/api/Auth/register", {
    fullName: data.full_name,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirm_password,
  });

  return response.data;
};

export const confirmAccount = async (
  email: string,
  otpCode: string
): Promise<ApiConfirmResponse> => {
  // Using the exact mock URL you provided. We can swap this to `/api/Auth/confirm` later
  const url = "http://127.0.0.1:3658/m2/1212435-1208182-default/31810759";
  
  const response = await apiClient.post<ApiConfirmResponse>(url, {
    email,
    otpCode,
  });

  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  await apiClient.get("/api/Auth/logout");
};
