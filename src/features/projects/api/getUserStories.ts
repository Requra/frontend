import { apiClient } from "@/services/api";
import type { ApiResponse } from "@/types/api";
import type { UserStory } from "../types";

/**
 * Service to fetch all user stories associated with a project.
 */
export async function getUserStoriesApi(projectId: string): Promise<UserStory[]> {
  const response = await apiClient.get<ApiResponse<{ items: UserStory[]; totalCount: number }>>(
    "/api/results/userstories",
    { params: { project_id: projectId } }
  );

  if (!response.data.isSuccess || !response.data.data) {
    if (response.data.statusCode === 404) return [];

    throw new Error(response.data.message || "Failed to fetch user stories");
  }

  return response.data.data.items || [];
}
