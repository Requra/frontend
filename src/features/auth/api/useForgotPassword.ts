import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "./auth";
import type { ApiForgotPasswordResponse } from "../types";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errorHelpers";

export const useForgotPassword = () => {
  return useMutation<
    ApiForgotPasswordResponse,
    AxiosError<ApiForgotPasswordResponse>,
    string
  >({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      if (response.isSuccess) {
        toast.success(response.message);
      } else {
        toast.error(response.errors?.[0] || response.message || "Failed to initiate password reset.");
      }
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
