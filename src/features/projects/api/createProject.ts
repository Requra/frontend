import { apiClient } from "@/services/api";
import type { ApiResponse } from "@/types/api";
import type { ApiProject } from "../types";
import type { CreateProjectFormData } from "../schemas/createProjectSchema";

/**
 * Service to create a new project.
 * Senior Practice: Explicit mapping from Form Data to API DTO.
 */
export async function createProjectApi(
  formData: CreateProjectFormData
): Promise<ApiProject> {
  // Map form data to backend-expected structure
  const requestBody = {
    name: formData.projectName,
    description: formData.description || "",
    clientName: formData.clientName,
    teamMembers: formData.teamMembers.map((email) => ({ email })),
    // Note: status is likely set by backend to 'InProgress' by default
  };

  const response = await apiClient.post<ApiResponse<ApiProject>>(
    "/api/projects",
    requestBody
  );

  if (!response.data.isSuccess || !response.data.data) {
    throw new Error(response.data.message || "Failed to create project");
  }

  return response.data.data;
}
