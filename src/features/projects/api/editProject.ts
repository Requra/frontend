import { apiClient } from "@/services/api";
import type { ApiResponse } from "@/types/api";
import type { ApiProject } from "../types";
import type { CreateProjectFormData } from "../schemas/createProjectSchema";

/**
 * Service to update an existing project.
 * Uses the same schema as creation but as a patch subset.
 */
export async function editProjectApi(
  id: string,
  formData: Partial<CreateProjectFormData>
): Promise<ApiProject> {
  // Map partial form data to backend update structure
  const requestBody: any = {};
  if (formData.projectName) requestBody.name = formData.projectName;
  if (formData.description !== undefined) requestBody.description = formData.description;
  if (formData.clientName) requestBody.clientName = formData.clientName;
  if (formData.teamMembers) {
    requestBody.teamMembers = formData.teamMembers.map(email => ({ email }));
  }

  const response = await apiClient.patch<ApiResponse<ApiProject>>(
    "/api/projects",
    requestBody,
    { params: { id } }
  );

  if (!response.data.isSuccess || !response.data.data) {
    throw new Error(response.data.message || "Failed to update project");
  }

  return response.data.data;
}
