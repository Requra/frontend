import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "./auth";
import type { ApiResetPasswordResponse } from "../types";
import type { ResetPasswordCredentials } from "../schemas/resetPasswordSchema";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errorHelpers";

export const useResetPassword = () => {
  return useMutation<ApiResetPasswordResponse, AxiosError<ApiResetPasswordResponse>, ResetPasswordCredentials>({
    mutationFn: resetPassword,
    onSuccess: (response) => {
      if (response.isSuccess) {
        toast.success(response.message);
      } else {
        toast.error(response.errors?.[0] || response.message || "Failed to reset password.");
      }
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
