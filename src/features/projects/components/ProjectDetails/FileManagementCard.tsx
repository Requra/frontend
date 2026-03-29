import { Card } from "@/components/ui/Card/Card";
import { Badge } from "@/components/ui/Badge/Badge";
import { FileText, Download, Eye, FolderOpen } from "lucide-react";

export const FileManagementCard = () => {
  const files = [
    {
      id: 1,
      name: "Core_Banking_Specs.pdf",
      size: "12.4 MB",
      date: "Verified Oct 24",
      status: "Processed",
      type: "pdf",
    },
    {
      id: 2,
      name: "Architecture_Diagram.png",
      size: "4.2 MB",
      date: "Verified Oct 23",
      status: "Processed",
      type: "image",
    },
  ];

  const getFileIconColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "bg-red-50 text-red-500 border-red-100/50";
      case "image":
        return "bg-blue-50 text-blue-500 border-blue-100/50";
      default:
        return "bg-neutral-50 text-neutral-500 border-neutral-100/50";
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
        {files.map((file) => (
          <div
            key={file.id}
            className="p-4 sm:px-6 flex items-center justify-between group hover:bg-neutral-50/80 transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border group-hover:scale-105 transition-transform duration-200 ${getFileIconColor(file.type)}`}
              >
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-neutral-900 text-sm group-hover:text-primary-600 transition-colors cursor-pointer">
                  {file.name}
                </span>
                <span className="text-xs text-neutral-500 font-medium mt-0.5">
                  {file.size} •{" "}
                  <span className="text-neutral-400">{file.date}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant="success"
                size="sm"
                className="uppercase tracking-wider font-bold border-none hidden sm:inline-flex"
              >
                {file.status}
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
        ))}
      </div>
    </Card>
  );
};
