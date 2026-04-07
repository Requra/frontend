import { apiClient } from "@/services/api";
import { toast } from "sonner";
import type { ApiResponse } from "@/types/api";
import type { Project } from "../types";
import type { CreateProjectFormData } from "../schemas/createProjectSchema";

/**
 * Service to create a new project.
 */
export async function createProjectApi(
  formData: CreateProjectFormData
): Promise<Project> {
  try {
    // Map form data to backend-expected structure
    const requestBody = {
      name: formData.projectName,
      description: formData.description || "",
      clientName: formData.clientName,
      teamMembers: formData.teamMembers.map((email) => ({ email })),
      // Note: status is likely set by backend to 'InProgress' by default
    };

    const response = await apiClient.post<ApiResponse<Project>>(
      "/api/projects",
      requestBody
    );

    if (!response.data.isSuccess || !response.data.data) {
      const message = response.data.message || "Failed to create project";
      toast.error(message);
      throw new Error(message);
    }

    return response.data.data;
  } catch (error: any) {
    if (!error.message || error.message === "Failed to create project") {
       toast.error("Network error: Unable to create project.");
    }
    throw error;
  }
}
