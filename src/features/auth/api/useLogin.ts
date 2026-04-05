import { useMutation } from "@tanstack/react-query";
import { loginWithEmailAndPassword } from "./auth";
import { useAuthStore } from "@/stores/auth";
import type { ApiLoginResponse } from "../types";
import type { AxiosError } from "axios";
import type { LoginCredentials } from "../schemas/loginSchema";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errorHelpers";

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<ApiLoginResponse, AxiosError<ApiLoginResponse>, LoginCredentials>({
    mutationFn: loginWithEmailAndPassword,
    onSuccess: (response) => {
      if (response.isSuccess && response.data?.token) {
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
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
