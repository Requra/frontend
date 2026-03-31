import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "./auth";
import type { ApiConfirmResponse } from "../types";

interface ConfirmAccountParams {
  email: string;
  otpCode: string;
}

export const useConfirmAccount = () => {
  return useMutation<ApiConfirmResponse, Error, ConfirmAccountParams>({
    mutationFn: ({ email, otpCode }) => confirmAccount(email, otpCode),
  });
};
