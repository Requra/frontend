import { apiClient } from "@/services/api";
import type {
  ApiLoginResponse,
  ApiRegisterResponse,
  ApiConfirmResponse,
  ApiForgotPasswordResponse,
  ApiVerifyOtpResponse,
  ApiResetPasswordResponse,
  ApiResendOtpResponse,
} from "../types";
import type { LoginCredentials } from "../schemas/loginSchema";
import type { RegisterCredentials } from "../schemas/registerSchema";
import type { ResetPasswordCredentials } from "../schemas/resetPasswordSchema";

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
  data: RegisterCredentials,
): Promise<ApiRegisterResponse> => {
  const response = await apiClient.post<ApiRegisterResponse>(
    "/api/Auth/register",
    {
      fullName: data.full_name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirm_password,
    },
  );

  return response.data;
};

export const confirmAccount = async (
  email: string,
  otpCode: string,
): Promise<ApiConfirmResponse> => {
  const response = await apiClient.post<ApiConfirmResponse>(
    "/api/Auth/confirm-account",
    {
      email,
      otpCode,
    },
  );

  return response.data;
};

export const forgotPassword = async (
  email: string,
): Promise<ApiForgotPasswordResponse> => {
  const response = await apiClient.post<ApiForgotPasswordResponse>("/api/Auth/password/forgot", {
    email,
  });

  return response.data;
};

export const verifyForgotPasswordOtp = async (
  otp: string,
): Promise<ApiVerifyOtpResponse> => {
  const response = await apiClient.post<ApiVerifyOtpResponse>("/api/Auth/password/verifyotp", {
    otp,
  });

  return response.data;
};

export const resetPassword = async (
  data: ResetPasswordCredentials,
): Promise<ApiResetPasswordResponse> => {
  const response = await apiClient.post<ApiResetPasswordResponse>("/api/Auth/password/reset", {
    newPassword: data.password,
    confirmPassword: data.confirm_password,
  });

  return response.data;
};

export const resendOtp = async (
  email: string,
  otpType: number,
): Promise<ApiResendOtpResponse> => {
  const response = await apiClient.post<ApiResendOtpResponse>("/api/Auth/otp/resend", {
    email,
    otpType,
  });

  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  await apiClient.post("/api/Auth/logout");
};
