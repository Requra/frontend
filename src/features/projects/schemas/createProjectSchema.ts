import { z } from "zod";

export const projectTypes = [
  { value: "web", label: "Web Application" },
  { value: "mobile", label: "Mobile Application" },
  { value: "desktop", label: "Desktop Application" },
  { value: "api", label: "API / Backend" },
  { value: "saas", label: "SaaS Platform" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "other", label: "Other" },
] as const;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createProjectSchema = z.object({
  projectName: z
    .string()
    .min(1, "Project name is required")
    .min(3, "Project name must be at least 3 characters")
    .max(100, "Project name must be less than 100 characters"),
  clientName: z
    .string()
    .min(1, "Client / Stakeholder name is required")
    .max(100, "Client name must be less than 100 characters"),
  projectType: z
    .string()
    .min(1, "Please select a project type"),
  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
  teamMembers: z
    .array(z.string().email("Invalid email address"))
    .default([]),
});

export type CreateProjectFormData = z.infer<typeof createProjectSchema>;

export function isValidEmail(value: string): boolean {
  return emailRegex.test(value);
}
