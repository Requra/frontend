import { apiClient } from "@/services/api";
import { toast } from "sonner";
import type { ApiResponse } from "@/types/api";
import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE } from "../constants";

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: "uploading" | "completed" | "error";
  errorMessage?: string;
}

/**
 * Validates a file for size and extension.
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  const extension = file.name.split(".").pop()?.toLowerCase() || "";

  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return {
      valid: false,
      error: `Unsupported format ".${extension}". Supported: ${ALLOWED_EXTENSIONS.join(", ").toUpperCase()}.`,
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File exceeds 25MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).`,
    };
  }

  return { valid: true };
}

/**
 * Service to upload a file to a specific project.
 */
export async function uploadFileApi(
  file: File,
  projectId: string,
  onProgress: (progress: number) => void,
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("project_id", projectId);
    formData.append("title", file.name);
    // Assuming 'type' is needed based on OAS (0 for now as placeholder)
    formData.append("type", "0");

    const response = await apiClient.post<ApiResponse<any>>(
      "/api/documents",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        },
      }
    );

    if (!response.data.isSuccess) {
      const message = response.data.message || "Upload failed";
      toast.error(message);
      return { success: false, error: message };
    }

    return { success: true, data: response.data.data };
  } catch (error: any) {
    console.error("Upload Error:", error);
    const message = error?.response?.data?.message || "An unexpected error occurred during upload.";
    toast.error(message);
    return { 
      success: false, 
      error: message 
    };
  }
}
