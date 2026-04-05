import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "./auth";
import type { ApiConfirmResponse } from "../types";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errorHelpers";

interface ConfirmAccountParams {
  email: string;
  otpCode: string;
}

export const useConfirmAccount = () => {
  return useMutation<ApiConfirmResponse, Error, ConfirmAccountParams>({
    mutationFn: ({ email, otpCode }) => confirmAccount(email, otpCode),
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
