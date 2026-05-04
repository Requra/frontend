import { z } from "zod";
import { ProjectStatus, ProjectType } from "../types/enums";

export const projectTypes = [
  { value: ProjectType.Financial, label: "Financial" },
  { value: ProjectType.Medical, label: "Medical" },
  { value: ProjectType.Educational, label: "Educational" },
] as const;

export const statusOptions = [
  { value: ProjectStatus.InProgress, label: "In Progress" },
  { value: ProjectStatus.Drafted, label: "Draft" },
  { value: ProjectStatus.Completed, label: "Completed" },
  { value: ProjectStatus.Cancelled, label: "Cancelled" },
] as const;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createProjectSchema = z.object({
  projectName: z
    .string()
    .min(1, "Project name is required")
    .min(3, "Project name must be at least 3 characters")
    .max(100, "Project name must be less than 100 characters"),
  clientEmail: z
    .string()
    .min(1, "Client email is required")
    .email("Invalid email address"),
  projectType: z
    .array(z.number())
    .min(1, "Please select at least one project type"),
  status: z
    .preprocess((val) => (typeof val === "string" ? parseInt(val, 10) : val), z.nativeEnum(ProjectStatus))
    .default(ProjectStatus.InProgress),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be less than 1000 characters"),
  teamMembers: z
    .array(z.string().email("Invalid email address"))
    .default([]),
});

export type CreateProjectFormData = z.infer<typeof createProjectSchema>;

export function isValidEmail(value: string): boolean {
  return emailRegex.test(value);
}
