import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/features/auth/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        localStorage.setItem("auth_token_mock", token);
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem("auth_token_mock");
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage", // name in localStorage for persistence
    }
  )
);
