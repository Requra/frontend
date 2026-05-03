import { z } from "zod";

/**
 * Base schema for registration fields.
 * We define this separately to ensure clean type inference for react-hook-form.
 */
export const registerObjectSchema = z.object({
  full_name: z.string().min(2, "Please enter your full name."),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid work email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character."),
  confirm_password: z.string(),
  role: z.coerce.number().min(0).max(2, "Please select a valid role."),
});

/**
 * Refined schema including password matching logic.
 * Used by the form resolver.
 */
export const registerSchema = registerObjectSchema.refine(
  (data) => data.password === data.confirm_password,
  {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  }
);

export type RegisterCredentials = z.infer<typeof registerObjectSchema>;
