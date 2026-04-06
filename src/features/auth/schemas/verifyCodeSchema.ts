import { z } from "zod";

export const verifyCodeSchema = z.object({
  code: z
    .string()
    .min(6, "Verification code must be 6 characters")
    .max(6, "Verification code must be 6 characters"),
});

export type VerifyCodeCredentials = z.infer<typeof verifyCodeSchema>;
