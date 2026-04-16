import { useState, useCallback, useRef } from "react";
import { toast } from "sonner";
import {
  validateFile,
  uploadFileApi,
  type UploadedFile,
} from "../api/uploadFiles";

export function useFileUpload(projectId?: string) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  // Use a ref to track current files without React's async state delay
  const filesRef = useRef<UploadedFile[]>([]);

  // Update ref whenever state changes
  const updateFiles = useCallback((updater: (prev: UploadedFile[]) => UploadedFile[]) => {
    setFiles((prev) => {
      const next = updater(prev);
      filesRef.current = next;
      return next;
    });
  }, []);

  const handleFilesSelected = useCallback(
    async (selectedFiles: File[]) => {
      if (!projectId) {
        toast.error("Project ID is missing. Cannot upload files.");
        return;
      }

      const filesToUpload: { file: File; id: string }[] = [];
      const newFilesItems: UploadedFile[] = [];

      // Duplicate check against the ref (immediate access)
      for (const file of selectedFiles) {
        const validation = validateFile(file);
        if (!validation.valid) {
          toast.error(`${file.name}: ${validation.error}`);
          continue;
        }

        const isDuplicate = filesRef.current.some(
          (f) => f.name === file.name && f.size === file.size
        ) || newFilesItems.some((f) => f.name === file.name && f.size === file.size);

        if (isDuplicate) {
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

        newFilesItems.push(newFile);
        filesToUpload.push({ file, id });
      }

      if (newFilesItems.length > 0) {
        updateFiles((prev) => [...prev, ...newFilesItems]);
      }

      // Sequential uploads
      for (const { file, id } of filesToUpload) {
        try {
          const result = await uploadFileApi(file, projectId, (progress) => {
            updateFiles((prev) =>
              prev.map((f) => (f.id === id ? { ...f, progress } : f))
            );
          });

          if (result.success) {
            updateFiles((prev) =>
              prev.map((f) =>
                f.id === id ? { ...f, status: "completed", progress: 100 } : f
              )
            );
          } else {
            updateFiles((prev) =>
              prev.map((f) =>
                f.id === id
                  ? { ...f, status: "error", errorMessage: result.error }
                  : f
              )
            );
          }
        } catch (err) {
          updateFiles((prev) =>
            prev.map((f) =>
              f.id === id
                ? { ...f, status: "error", errorMessage: "Upload failed." }
                : f
            )
          );
        }
      }
    },
    [projectId, updateFiles]
  );

  const handleRemove = useCallback((id: string) => {
    updateFiles((prev) => prev.filter((f) => f.id !== id));
  }, [updateFiles]);

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
