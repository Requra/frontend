import { apiClient } from "@/services/api";
import { toast } from "sonner";
import type { ApiResponse } from "@/types/api";
import type { Project } from "../types";
import type { CreateProjectFormData } from "../schemas/createProjectSchema";

/**
 * Service to update an existing project.
 * Uses the same schema as creation but as a patch subset.
 */
export async function editProjectApi(
  id: string,
  formData: Partial<CreateProjectFormData>
): Promise<Project> {
  try {
    // Map partial form data to backend update structure
    const requestBody: any = {};
    if (formData.projectName) requestBody.name = formData.projectName;
    if (formData.description !== undefined) requestBody.description = formData.description;
    if (formData.clientName) requestBody.clientName = formData.clientName;
    if (formData.status !== undefined) requestBody.status = formData.status;
    if (formData.teamMembers) {
      requestBody.teamMembers = formData.teamMembers.map(email => ({ email }));
    }

    const response = await apiClient.patch<ApiResponse<Project>>(
      "/api/projects",
      requestBody,
      { params: { id } }
    );


    if (!response.data.isSuccess || !response.data.data) {
      const message = response.data.message || "Failed to update project";
      toast.error(message);
      throw new Error(message);
    }

    return response.data.data;
  } catch (error: any) {
    if (!error.message || error.message === "Failed to update project") {
      toast.error("Network error: Unable to update project.");
    }
    throw error;
  }
}
