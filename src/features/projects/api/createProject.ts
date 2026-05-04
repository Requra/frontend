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
    const projectTypeTotal = formData.projectType.reduce((acc, val) => acc + val, 0);

    // Map form data to backend-expected structure
    const requestBody = {
      name: formData.projectName,
      description: formData.description,
      ProjectType: projectTypeTotal.toString(),
      clientEmail: formData.clientEmail,
      teamMembers: formData.teamMembers.map((email) => ({ email })),
    };

    const response = await apiClient.post<ApiResponse<Project>>(
      "/api/projects",
      requestBody
    );

    if (!response.data.isSuccess || !response.data.data) {
      const message = response.data.message || "Failed to create project";
      const error = new Error(message) as any;
      error.statusCode = response.data.statusCode;
      throw error;
    }

    return response.data.data;
  } catch (error: any) {
    if (!error.message || error.message === "Failed to create project") {
       toast.error("Network error: Unable to create project.");
    }
    throw error;
  }
}
