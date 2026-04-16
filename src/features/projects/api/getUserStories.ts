import { apiClient } from "@/services/api";
import { toast } from "sonner";
import type { ApiResponse } from "@/types/api";
import type { UserStory } from "../types";

/**
 * Service to fetch all user stories associated with a project.
 */
export async function getUserStoriesApi(projectId: string): Promise<UserStory[]> {
  try {
    const response = await apiClient.get<ApiResponse<{ items: UserStory[]; totalCount: number }>>(
      "/api/results/userstories",
      { params: { project_id: projectId } }
    );

    if (!response.data.isSuccess || !response.data.data) {
      if (response.data.statusCode === 404) return [];
      
      const message = response.data.message || "Failed to fetch user stories";
      toast.error(message);
      throw new Error(message);
    }

    // Returning items directly from the backend response
    return response.data.data.items.map(story => ({
      ...story,
      qualityScore: 80, // Derived/optional field for UI
    }));
  } catch (error: any) {
    if (!error.message || error.message === "Failed to fetch user stories") {
      toast.error("Network error: Unable to load user stories.");
    }
    throw error;
  }
}
