import { apiClient } from "@/services/api";
import type { ApiResponse } from "@/types/api";
import type { ApiUserStory, UserStory } from "../types";

/**
 * Parses a User Story string (e.g. "As a <role>, I want <action>, so that <benefit>")
 * into separate fields for the UI.
 * Senior Practice: Graceful degradation if format is non-standard.
 */
function parseStory(title: string): { role: string; action: string; benefit: string } {
  const roleMatch = title.match(/As a (.*?), I want/i);
  const actionMatch = title.match(/I want (.*?), so that/i);
  const benefitMatch = title.match(/so that (.*)/i);

  return {
    role: roleMatch?.[1]?.trim() || "User",
    action: actionMatch?.[1]?.trim() || title, // Fallback to full title if no match
    benefit: benefitMatch?.[1]?.trim() || "the system functions as expected",
  };
}

/**
 * Transforms backend user story DTO to frontend UI model.
 */
function transformUserStory(apiStory: ApiUserStory): UserStory {
  const { role, action, benefit } = parseStory(apiStory.title);
  
  return {
    id: apiStory.id,
    status: apiStory.status,
    role,
    action,
    benefit,
    priority: apiStory.priority,
    qualityScore: 80, // Default for now if not in API
    createdAt: apiStory.createdAt,
    comments: apiStory.comments,
  };
}

/**
 * Service to fetch all user stories associated with a project.
 */
export async function getUserStoriesApi(projectId: string): Promise<UserStory[]> {
  const response = await apiClient.get<ApiResponse<{ items: ApiUserStory[]; totalCount: number }>>(
    "/api/results/userstories",
    { params: { project_id: projectId } }
  );

  if (!response.data.isSuccess || !response.data.data) {
    if (response.data.statusCode === 404) return [];
    throw new Error(response.data.message || "Failed to fetch user stories");
  }

  return response.data.data.items.map(transformUserStory);
}
