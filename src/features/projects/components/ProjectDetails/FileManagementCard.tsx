import { Card } from "@/components/ui/Card/Card";
import { Badge } from "@/components/ui/Badge/Badge";
import { FileText, Download, Eye, FolderOpen, FileAudio, FileBadge } from "lucide-react";
import { DocumentStatus, DocumentType } from "../../types/enums";

export const FileManagementCard = () => {
  const files = [
    {
      id: "1",
      name: "Core_Banking_Specs.pdf",
      size: 12400000,
      upload_date: "2024-10-24T10:00:00Z",
      status: DocumentStatus.Ready,
      type: DocumentType.pdf,
    },
    {
      id: "2",
      name: "Architecture_Diagram.docx",
      size: 4200000,
      upload_date: "2024-10-23T14:30:00Z",
      status: DocumentStatus.Processing,
      type: DocumentType.docx,
    },
  ];

  const TYPE_LABELS: Record<DocumentType, string> = {
    [DocumentType.pdf]: "PDF",
    [DocumentType.docx]: "DOCX",
    [DocumentType.audio]: "Audio",
    [DocumentType.live_session]: "Live Session",
  };

  const STATUS_LABELS: Record<DocumentStatus, string> = {
    [DocumentStatus.Pending]: "Pending",
    [DocumentStatus.Processing]: "Processing",
    [DocumentStatus.Ready]: "Processed",
    [DocumentStatus.Failed]: "Failed",
  };

  const getFileIcon = (type: DocumentType) => {
    switch (type) {
      case DocumentType.audio:
        return FileAudio;
      case DocumentType.live_session:
        return FileBadge;
      default:
        return FileText;
    }
  };

  const getFileIconColor = (type: DocumentType) => {
    switch (type) {
      case DocumentType.pdf:
        return "bg-red-50 text-red-500 border-red-100/50";
      case DocumentType.docx:
        return "bg-blue-50 text-blue-500 border-blue-100/50";
      case DocumentType.audio:
        return "bg-amber-50 text-amber-500 border-amber-100/50";
      default:
        return "bg-neutral-50 text-neutral-500 border-neutral-100/50";
    }
  };

  const getStatusVariant = (status: DocumentStatus): "success" | "warning" | "destructive" | "extracted" => {
    switch (status) {
      case DocumentStatus.Ready: return "success";
      case DocumentStatus.Processing: return "extracted";
      case DocumentStatus.Failed: return "destructive";
      default: return "extracted";
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden shadow-sm border border-neutral-200/60 p-0">
      <div className="p-6 border-b border-neutral-100 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center">
            <FolderOpen className="w-4 h-4 text-neutral-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-neutral-900 tracking-tight">
              File Management
            </h3>
            <p className="text-xs text-neutral-400 font-medium mt-0.5">
              {files.length} source documents attached
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 divide-y divide-neutral-100 bg-white">
        {files.map((file) => {
          const Icon = getFileIcon(file.type);
          return (
            <div
              key={file.id}
              className="p-4 sm:px-6 flex items-center justify-between group hover:bg-neutral-50/80 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div
                  title={TYPE_LABELS[file.type]}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border group-hover:scale-105 transition-transform duration-200 ${getFileIconColor(file.type)}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-neutral-900 text-sm group-hover:text-primary-600 transition-colors cursor-pointer">
                    {file.name}
                  </span>
                  <span className="text-xs text-neutral-500 font-medium mt-0.5">
                    {(file.size / 1024 / 1024).toFixed(1)} MB •{" "}
                    <span className="text-neutral-400">
                      {new Date(file.upload_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge
                  variant={getStatusVariant(file.status)}
                  size="sm"
                  className="uppercase tracking-wider font-bold border-none hidden sm:inline-flex"
                >
                  {STATUS_LABELS[file.status]}
                </Badge>

                {/* Action Buttons visible on hover */}
                <div className="flex items-center space-x-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    aria-label="Preview file"
                    className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    aria-label="Download file"
                    className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
