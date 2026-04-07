import { apiClient } from "@/services/api";
import type { ApiResponse } from "@/types/api";

/**
 * Service to delete a project by its ID.
 */
export async function deleteProjectApi(id: string): Promise<boolean> {
  const response = await apiClient.delete<ApiResponse<boolean>>("/api/projects", {
    params: { id },
  });

  if (!response.data.isSuccess) {
    throw new Error(response.data.message || "Failed to delete project");
  }

  return true;
}
