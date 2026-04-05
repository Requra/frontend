import type { ApiResponse } from "@/types/api";

// ---------- API Response envelope ----------
export type ApiLoginResponse = ApiResponse<LoginResponseData>;

export type ApiRegisterResponse = ApiResponse<string>;

export type ApiConfirmResponse = ApiResponse<string>;

export type ApiForgotPasswordResponse = ApiResponse<boolean>;

export type ApiVerifyOtpResponse = ApiResponse<boolean>;

export type ApiResetPasswordResponse = ApiResponse<boolean>;

export type ApiResendOtpResponse = ApiResponse<boolean>;

export type ApiRefreshTokenResponse = ApiResponse<LoginResponseData>;

export interface LoginResponseData {
  userId: string | null;
  name: string | null;
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  roles: string[];
  profilePicture: string | null;
}

// ---------- Stored user (derived from a successful login) ----------
export interface User {
  userId: string;
  name: string;
  roles: string[];
  profilePicture: string | null;
}
