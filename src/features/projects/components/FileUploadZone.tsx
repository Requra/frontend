import React from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { cn } from "@/lib/utils";

interface FileUploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

export const FileUploadZone = ({
  onFilesSelected,
  disabled,
}: FileUploadZoneProps) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) onFilesSelected(files);
  };

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) onFilesSelected(files);
    e.target.value = "";
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={cn(
        "relative flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed px-6 py-12 cursor-pointer transition-all duration-200",
        isDragging
          ? "border-primary-400 bg-primary-50/50"
          : "border-neutral-300 bg-neutral-50/50 hover:border-primary-300 hover:bg-primary-50/20",
        disabled && "opacity-50 cursor-not-allowed",
      )}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf,.docx,.txt,.mp3,.mp4"
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled}
      />

      {/* Upload Icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-50">
        <Upload className="w-6 h-6 text-primary-500" />
      </div>

      {/* Text */}
      <div className="text-center">
        <p className="text-sm font-medium text-neutral-700">
          Click or drag file to this area to upload
        </p>
        <p className="text-xs text-neutral-400 mt-1">
          Supported formats: PDF, DOCX, TXT, MP3, MP4.
        </p>
      </div>

      {/* Upload Button */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        className="mt-1"
      >
        Upload Files
      </Button>
    </div>
  );
};
