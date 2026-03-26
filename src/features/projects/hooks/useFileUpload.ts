import { useState } from "react";
import { toast } from "sonner";
import {
  validateFile,
  uploadFileApi,
  type UploadedFile,
} from "../api/uploadFiles";

export function useFileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleFilesSelected = async (selectedFiles: File[]) => {
    for (const file of selectedFiles) {
      const validation = validateFile(file);

      if (!validation.valid) {
        toast.error(validation.error);
        continue;
      }

      // Check duplicate
      if (files.some((f) => f.name === file.name && f.size === file.size)) {
        toast.warning(`"${file.name}" is already added.`);
        continue;
      }

      const id = crypto.randomUUID();
      const newFile: UploadedFile = {
        id,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: "uploading",
      };

      setFiles((prev) => [...prev, newFile]);

      // Start upload
      try {
        const result = await uploadFileApi(file, (progress) => {
          setFiles((prev) =>
            prev.map((f) => (f.id === id ? { ...f, progress } : f)),
          );
        });

        if (result.success) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === id ? { ...f, status: "completed", progress: 100 } : f,
            ),
          );
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === id
                ? { ...f, status: "error", errorMessage: result.error }
                : f,
            ),
          );
        }
      } catch {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id
              ? { ...f, status: "error", errorMessage: "Upload failed." }
              : f,
          ),
        );
      }
    }
  };

  const handleRemove = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const completedFiles = files.filter((f) => f.status === "completed");
  const isUploading = files.some((f) => f.status === "uploading");

  return {
    files,
    completedFiles,
    isUploading,
    handleFilesSelected,
    handleRemove,
  };
}
