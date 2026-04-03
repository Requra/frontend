import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "./auth";
import type { ApiForgotPasswordResponse } from "../types";
import type { AxiosError } from "axios";
import { toast } from "sonner";

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
        toast.error(response.message);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
