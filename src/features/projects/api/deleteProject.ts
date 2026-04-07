import { apiClient } from "@/services/api";
import { toast } from "sonner";
import type { ApiResponse } from "@/types/api";

/**
 * Service to delete a project by its ID.
 */
export async function deleteProjectApi(id: string): Promise<boolean> {
  try {
    const response = await apiClient.delete<ApiResponse<boolean>>("/api/projects", {
      params: { id },
    });

    if (!response.data.isSuccess) {
      const message = response.data.message || "Failed to delete project";
      toast.error(message);
      throw new Error(message);
    }

    toast.success("Project deleted successfully");
    return true;
  } catch (error: any) {
    if (!error.message || error.message === "Failed to delete project") {
      toast.error("Network error: Unable to delete project.");
    }
    throw error;
  }
}
