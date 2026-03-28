import { X, FileText, FileAudio, FileVideo } from "lucide-react";
import type { UploadedFile } from "../api/uploadFiles";
import { formatFileSize, getFileExtension } from "../utils/file";
import { cn } from "@/lib/utils";

interface UploadedFileCardProps {
  file: UploadedFile;
  onRemove: (id: string) => void;
}

const extensionColors: Record<string, string> = {
  pdf: "bg-red-50 text-red-500",
  docx: "bg-blue-50 text-blue-500",
  txt: "bg-green-50 text-green-500",
  mp3: "bg-amber-50 text-amber-500",
  mp4: "bg-purple-50 text-purple-500",
};

function getFileIcon(extension: string) {
  switch (extension) {
    case "mp3":
      return FileAudio;
    case "mp4":
      return FileVideo;
    default:
      return FileText;
  }
}

export const UploadedFileCard = ({ file, onRemove }: UploadedFileCardProps) => {
  const extension = getFileExtension(file.name);
  const Icon = getFileIcon(extension);
  const colorClass = extensionColors[extension] || "bg-neutral-50 text-neutral-500";

  return (
    <div
      className={cn(
        "relative flex items-center gap-3 rounded-lg border px-4 py-3 min-w-[220px] transition-all",
        file.status === "error"
          ? "border-red-200 bg-red-50/50"
          : "border-neutral-200 bg-white",
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex items-center justify-center w-9 h-9 rounded-lg shrink-0",
          colorClass,
        )}
      >
        <Icon className="w-5 h-5" />
      </div>

      {/* Info */}
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-sm font-medium text-neutral-800 truncate">
          {file.name}
        </span>
        <span className="text-xs text-neutral-400">
          {file.status === "uploading"
            ? `Uploading... ${file.progress}%`
            : file.status === "error"
              ? file.errorMessage || "Upload failed"
              : `${formatFileSize(file.size)} • Uploaded`}
        </span>

        {/* Progress bar */}
        {file.status === "uploading" && (
          <div className="w-full h-1 bg-neutral-100 rounded-full mt-1.5 overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full transition-all duration-300"
              style={{ width: `${file.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Remove */}
      {file.status !== "uploading" && (
        <button
          type="button"
          onClick={() => onRemove(file.id)}
          className="shrink-0 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
