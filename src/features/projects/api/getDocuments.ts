import { apiClient } from "@/services/api";
import { toast } from "sonner";
import type { ApiResponse } from "@/types/api";
import type { ApiDocument, Document } from "../types";

/**
 * Transforms backend document DTO to frontend UI model.
 */
function transformDocument(apiDoc: ApiDocument): Document {
  return {
    id: apiDoc.id,
    name: apiDoc.name || "Untitled Document",
    type: apiDoc.type ,
    size: apiDoc.size || 0,
    uploadDate: apiDoc.upload_date || new Date().toISOString(),
    status: apiDoc.status,
  };
}

/**
 * Service to fetch all documents for a given project.
 * Uses the root path GET /?project_id=... as defined in OAS.
 */
export async function getDocumentsApi(projectId: string): Promise<Document[]> {
  try {
    const response = await apiClient.get<ApiResponse<ApiDocument[]>>("/", {
      params: { project_id: projectId },
    });

    if (!response.data.isSuccess || !response.data.data) {
      // If it's a 404 or empty list, return empty array safely
      if (response.data.statusCode === 404) return [];
      
      const message = response.data.message || "Failed to fetch documents";
      toast.error(message);
      throw new Error(message);
    }

    return response.data.data.map(transformDocument);
  } catch (error: any) {
    if (!error.message || error.message === "Failed to fetch documents") {
      toast.error("Network error: Unable to load documents.");
    }
    throw error;
  }
}
