import { useQuery } from "@tanstack/react-query";
import { getUserStoriesApi } from "../api/getUserStories";

/**
 * React Query hook for fetching user stories with caching.
 */
export function useUserStories(projectId?: string) {
  return useQuery({
    queryKey: ["userStories", projectId],
    queryFn: () => getUserStoriesApi(projectId!),
    enabled: !!projectId,
    staleTime: 30_000,    // 30s — data stays fresh, avoids unnecessary refetches
  });
}
