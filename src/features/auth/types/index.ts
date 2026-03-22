import { z } from "zod";

export type Role = "analyst" | "pm" | "stakeholder";
export type Language = "en" | "ar";

export interface User {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  role: Role;
  preferred_language: Language;
  avatar_url: string | null;
  is_active: boolean;
  last_login_at: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

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
    path: ["confirm_password"], // Error path
  });

export type RegisterCredentials = z.infer<typeof registerSchema>;
