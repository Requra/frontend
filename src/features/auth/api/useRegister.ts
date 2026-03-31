import { useMutation } from "@tanstack/react-query";
import { registerUser } from "./auth";
import type { ApiRegisterResponse } from "../types";
import type { RegisterCredentials } from "../schemas/registerSchema";

export const useRegister = () => {
  return useMutation<ApiRegisterResponse, Error, RegisterCredentials>({
    mutationFn: registerUser,
  });
};
