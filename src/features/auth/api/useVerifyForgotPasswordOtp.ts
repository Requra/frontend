import { useMutation } from "@tanstack/react-query";
import { verifyForgotPasswordOtp } from "./auth";
import type { ApiVerifyOtpResponse } from "../types";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errorHelpers";

export const useVerifyForgotPasswordOtp = () => {
  return useMutation<ApiVerifyOtpResponse, AxiosError<ApiVerifyOtpResponse>, string>({
    mutationFn: verifyForgotPasswordOtp,
    onSuccess: (response) => {
      if (response.isSuccess) {
        toast.success(response.message);
      } else {
        toast.error(response.errors?.[0] || response.message || "Verification failed.");
      }
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
