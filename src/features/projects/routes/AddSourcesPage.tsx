import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

import { Stepper } from "@/components/ui/Stepper/Stepper";
import { Button } from "@/components/ui/Button/Button";
import { Title } from "../components/Title";
import { FileUploadZone } from "../components/FileUploadZone";
import { UploadedFileCard } from "../components/UploadedFileCard";
import { AIInsightPanel } from "../components/AIInsightPanel";
import { useFileUpload } from "../hooks/useFileUpload";
import { STEPPER_STEPS } from "../constants";
import { paths } from "@/routes/paths";

export const AddSourcesPage = () => {
  const navigate = useNavigate();
  const { files, completedFiles, isUploading, handleFilesSelected, handleRemove } =
    useFileUpload();

  return (
    <div className="flex flex-col items-center w-full py-8 border border-neutral-200 rounded-lg bg-white shadow-sm my-8 h-fit">
      {/* Stepper */}
      <div className="w-full max-w-[712px] mb-8">
        <Stepper
          steps={[...STEPPER_STEPS]}
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
          onClick={() => navigate(paths.app.newProject)}
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
