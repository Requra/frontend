import { useMutation } from "@tanstack/react-query";
import { registerWithEmailAndPassword } from "./auth";
import { useAuthStore } from "@/stores/auth";
import type { RegisterCredentials, AuthResponse } from "../types";
import type { ApiResponse } from "@/types/api";

export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<ApiResponse<AuthResponse>, Error, RegisterCredentials>({
    mutationFn: registerWithEmailAndPassword,
    onSuccess: (response) => {
      if (response.IsSuccess && response.Data) {
        setAuth(
          response.Data.user,
          response.Data.token,
          response.Data.refreshToken ?? ""
        );
      }
    },
  });
};
