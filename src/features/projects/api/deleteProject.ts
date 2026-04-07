import { apiClient } from "@/services/api";
import type { ApiResponse } from "@/types/api";

/**
 * Deletes a project by its ID.
 * @param id The unique identifier of the project to delete.
 */
export const deleteProjectApi = async (id: string): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(`/api/projects/${id}`);
  return response.data;
};
