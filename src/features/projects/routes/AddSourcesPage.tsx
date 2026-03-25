import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

import { Stepper } from "@/components/ui/Stepper/Stepper";
import { Button } from "@/components/ui/Button/Button";
import Title from "../components/Title";
import { FileUploadZone } from "../components/FileUploadZone";
import { UploadedFileCard } from "../components/UploadedFileCard";
import { AIInsightPanel } from "../components/AIInsightPanel";
import {
  validateFile,
  uploadFileApi,
  type UploadedFile,
} from "../api/uploadFiles";
import { paths } from "@/routes/paths";

const steps = [
  { title: "Project Details" },
  { title: "Add Sources" },
  { title: "AI Generate" },
];

export const AddSourcesPage = () => {
  const navigate = useNavigate();
  const [files, setFiles] = React.useState<UploadedFile[]>([]);

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

  return (
    <div className="flex flex-col items-center w-full py-8 border border-neutral-200 rounded-lg bg-white shadow-sm my-8 h-fit">
      {/* Stepper */}
      <div className="w-full max-w-[712px] mb-8">
        <Stepper
          steps={steps}
          activeStep={1}
          orientation="horizontal"
          size="lg"
        />
      </div>

      {/* Title */}
      <Title
        title="Add Requirement Sources"
        description="Choose one or more sources to help AI understand your project"
      />

      {/* Content: Upload Zone + AI Panel */}
      <div className="w-full px-8 flex gap-6">
        {/* Left: Upload Area */}
        <div className="flex-1">
          <FileUploadZone
            onFilesSelected={handleFilesSelected}
            disabled={isUploading}
          />
        </div>

        {/* Right: AI Insight Panel */}
        <AIInsightPanel />
      </div>

      {/* Uploaded Sources */}
      {files.length > 0 && (
        <div className="w-full px-8 mt-8">
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">
            Uploaded Sources
          </h3>
          <div className="flex flex-wrap gap-3">
            {files.map((file) => (
              <UploadedFileCard
                key={file.id}
                file={file}
                onRemove={handleRemove}
              />
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-center gap-4 mt-8 px-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate(paths.project.create)}
        >
          Back
        </Button>
        <Button
          type="button"
          variant="gradient"
          disabled={completedFiles.length === 0 || isUploading}
          className="w-auto! px-6"
          onClick={() => {
            toast.success("Sources submitted! Generating requirements...");
            navigate(paths.app.dashboard);
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Generate
            <ArrowRight className="h-4 w-4" />
          </span>
        </Button>
      </div>
    </div>
  );
};
