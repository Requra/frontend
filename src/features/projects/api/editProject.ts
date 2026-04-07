import { apiClient } from "@/services/api";
import { toast } from "sonner";
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
  try {
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
      const message = response.data.message || "Failed to update project";
      toast.error(message);
      throw new Error(message);
    }

    toast.success("Project updated successfully");
    return response.data.data;
  } catch (error: any) {
    if (!error.message || error.message === "Failed to update project") {
      toast.error("Network error: Unable to update project.");
    }
    throw error;
  }
}
