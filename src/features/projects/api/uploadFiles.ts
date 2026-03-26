import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE } from "../constants";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

export async function uploadFileApi(
  _file: File,
  onProgress: (progress: number) => void,
): Promise<{ success: boolean; error?: string }> {
  // Simulate upload progress in chunks
  const totalSteps = 10;
  for (let i = 1; i <= totalSteps; i++) {
    await delay(150 + Math.random() * 200);
    onProgress(Math.round((i / totalSteps) * 100));
  }

  // 5% chance of simulated server error
  if (Math.random() < 0.05) {
    return { success: false, error: "Upload failed. Please try again." };
  }

  return { success: true };
}
