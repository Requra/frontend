import type { CreateProjectFormData } from "../schemas/createProjectSchema";

// Simulates network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface ProjectResponse {
  id: string;
  projectName: string;
  clientName: string;
  projectType: string;
  description?: string;
  teamMembers: string[];
  createdAt: string;
}

export async function createProjectApi(
  data: CreateProjectFormData
): Promise<ProjectResponse> {
  // Simulate network delay
  await delay(1500);

  // Simulate random server error (10% chance)
  if (Math.random() < 0.1) {
    throw new Error("Server error: Unable to create project. Please try again.");
  }

  // Return mock response
  return {
    id: crypto.randomUUID(),
    projectName: data.projectName,
    clientName: data.clientName,
    projectType: data.projectType,
    description: data.description || undefined,
    teamMembers: data.teamMembers || [],
    createdAt: new Date().toISOString(),
  };
}
