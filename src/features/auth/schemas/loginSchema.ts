import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid work email address."),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long."),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
