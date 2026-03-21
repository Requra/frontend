import type { ApiResponse } from "@/types/api";
import type { AuthResponse, LoginCredentials, RegisterCredentials, User } from "../types";
import { mockUsers } from "./mockAuthDb";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const loginWithEmailAndPassword = async (
  data: LoginCredentials
): Promise<ApiResponse<AuthResponse>> => {
  await delay(1000);

  const user = mockUsers.find((u) => u.email === data.email);

  // In a real app, password verification happens on the backend
  if (!user || data.password !== "password") { 
    return {
      IsSuccess: false,
      Data: null,
      Message: "Invalid email or password",
      StatusCode: 401,
      Errors: ["Invalid credentials"],
    };
  }

  const token = "mock_jwt_token_" + Math.random().toString(36).substring(7);

  return {
    IsSuccess: true,
    Data: {
      user,
      token,
    },
    Message: "Login successful",
    StatusCode: 200,
    Errors: null,
  };
};

export const registerWithEmailAndPassword = async (
  data: RegisterCredentials
): Promise<ApiResponse<AuthResponse>> => {
  await delay(1000);

  const existingUser = mockUsers.find((u) => u.email === data.email);
  if (existingUser) {
    return {
      IsSuccess: false,
      Data: null,
      Message: "Registration failed",
      StatusCode: 400,
      Errors: ["Email already exists"],
    };
  }

  const newUser: User = {
    id: "uuid-" + Math.random().toString(36).substring(7),
    email: data.email,
    password_hash: "mock_hash", // Fake hash
    full_name: data.full_name,
    role: "analyst", // Default role
    preferred_language: "en",
    avatar_url: null,
    is_active: true,
    last_login_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  mockUsers.push(newUser);

  const token = "mock_jwt_token_" + Math.random().toString(36).substring(7);

  return {
    IsSuccess: true,
    Data: {
      user: newUser,
      token,
    },
    Message: "Registration successful",
    StatusCode: 201,
    Errors: null,
  };
};

export const getUser = async (): Promise<ApiResponse<User>> => {
  await delay(500);
  
  // Pretend we verify token from localStorage and get the user
  const token = localStorage.getItem("auth_token_mock");
  if (!token) {
     return {
        IsSuccess: false,
        Data: null,
        Message: "Unauthorized",
        StatusCode: 401,
        Errors: null,
    };
  }

  // Fallback to first user for mock auth persistence
  return {
    IsSuccess: true,
    Data: mockUsers[0],
    Message: "User fetched",
    StatusCode: 200,
    Errors: null,
  };
};
