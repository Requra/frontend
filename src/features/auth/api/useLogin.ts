import { useMutation } from "@tanstack/react-query";
import { loginWithEmailAndPassword } from "./auth";
import { useAuthStore } from "@/stores/auth";
import type { LoginCredentials, AuthResponse } from "../types";
import type { ApiResponse } from "@/types/api";

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<ApiResponse<AuthResponse>, Error, LoginCredentials>({
    mutationFn: loginWithEmailAndPassword,
    onSuccess: (response) => {
      if (response.IsSuccess && response.Data) {
        setAuth(response.Data.user, response.Data.token);
      }
    },
  });
};
