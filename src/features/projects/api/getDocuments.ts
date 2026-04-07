import { apiClient } from "@/services/api";
import { toast } from "sonner";
import type { ApiResponse } from "@/types/api";
import type { Document } from "../types";

/**
 * Service to fetch all documents for a given project.
 * Uses the root path GET /?project_id=... as defined in OAS.
 * Senior Practice: Using direct API responses for UI models.
 */
export async function getDocumentsApi(projectId: string): Promise<Document[]> {
  try {
    const response = await apiClient.get<ApiResponse<{ items: Document[]; totalCount: number }>>("/", {
      params: { project_id: projectId },
    });

    if (!response.data.isSuccess || !response.data.data) {
      if (response.data.statusCode === 404) return [];
      
      const message = response.data.message || "Failed to fetch documents";
      toast.error(message);
      throw new Error(message);
    }

    return response.data.data.items || [];
  } catch (error: any) {
    if (!error.message || error.message === "Failed to fetch documents") {
      toast.error("Network error: Unable to load documents.");
    }
    throw error;
  }
}
