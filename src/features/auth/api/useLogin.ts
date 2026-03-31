import { useMutation } from "@tanstack/react-query";
import { loginWithEmailAndPassword } from "./auth";
import { useAuthStore } from "@/stores/auth";
import type { LoginCredentials, ApiLoginResponse } from "../types";
import type { AxiosError } from "axios";

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<ApiLoginResponse, AxiosError<ApiLoginResponse>, LoginCredentials>({
    mutationFn: loginWithEmailAndPassword,
    onSuccess: (response) => {
      if (response.isSuccess && response.data.token) {
        setAuth(
          {
            userId: response.data.userId!,
            name: response.data.name!,
            roles: response.data.roles,
            profilePicture: response.data.profilePicture,
          },
          response.data.token,
          response.data.refreshToken!
        );
      }
    },
  });
};
