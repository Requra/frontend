import { useMutation } from "@tanstack/react-query";
import { registerUser } from "./auth";
import type { ApiRegisterResponse } from "../types";
import type { RegisterCredentials } from "../schemas/registerSchema";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errorHelpers";

export const useRegister = () => {
  return useMutation<ApiRegisterResponse, Error, RegisterCredentials>({
    mutationFn: registerUser,
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
