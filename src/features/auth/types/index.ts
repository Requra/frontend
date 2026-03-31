import { z } from "zod";

// ---------- API Response envelope ----------
export interface ApiLoginResponse {
  isSuccess: boolean;
  data: LoginResponseData;
  message: string;
  statusCode: number;
  errors: string[];
}

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

// ---------- Zod schemas & credential types ----------
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid work email address."),
  password: z.string().min(1, "Password is required"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    full_name: z.string().min(2, "Please enter your full name."),
    email: z.string().min(1, "Email is required").email("Please enter a valid work email address."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

export type RegisterCredentials = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid work email address."),
});

export type ForgotPasswordCredentials = z.infer<typeof forgotPasswordSchema>;

export const verifyCodeSchema = z.object({
  code: z.string().min(6, "Verification code must be 6 characters").max(6, "Verification code must be 6 characters"),
});

export type VerifyCodeCredentials = z.infer<typeof verifyCodeSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

export type ResetPasswordCredentials = z.infer<typeof resetPasswordSchema>;
