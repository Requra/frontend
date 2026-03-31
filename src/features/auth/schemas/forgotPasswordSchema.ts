import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid work email address."),
});

export type ForgotPasswordCredentials = z.infer<typeof forgotPasswordSchema>;
