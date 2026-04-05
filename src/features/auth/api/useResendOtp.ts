import { useMutation } from "@tanstack/react-query";
import { resendOtp } from "./auth";
import type { ApiResendOtpResponse } from "../types";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errorHelpers";

interface ResendOtpParams {
  email: string;
  otpType: number;
}

export const useResendOtp = () => {
  return useMutation<ApiResendOtpResponse, AxiosError<ApiResendOtpResponse>, ResendOtpParams>({
    mutationFn: ({ email, otpType }) => resendOtp(email, otpType),
    onSuccess: (response) => {
      if (response.isSuccess) {
        toast.success(response.message);
      } else {
        toast.error(response.errors?.[0] || response.message || "Failed to resend OTP.");
      }
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
