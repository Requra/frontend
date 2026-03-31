import { z } from "zod";

export const registerSchema = z
  .object({
    full_name: z.string().min(2, "Please enter your full name."),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid work email address."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

export type RegisterCredentials = z.infer<typeof registerSchema>;
