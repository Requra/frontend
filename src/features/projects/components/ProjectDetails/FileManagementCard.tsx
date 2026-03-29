import { Card } from "@/components/ui/Card/Card";
import { Badge } from "@/components/ui/Badge/Badge";
import { FileText, Download, Eye } from "lucide-react";

export const FileManagementCard = () => {
  const files = [
    {
      id: 1,
      name: "Core_Banking_Specs.pdf",
      size: "12.4 MB",
      date: "Verified Oct 24",
      status: "Processed",
    },
    {
      id: 2,
      name: "Architecture_Diagram.png",
      size: "4.2 MB",
      date: "Verified Oct 23",
      status: "Processed",
    },
  ];

  return (
    <Card className="flex flex-col overflow-hidden shadow-sm border border-neutral-200/60 p-0 mt-0">
      <div className="p-6 border-b border-neutral-100 bg-white">
        <h3 className="text-lg font-bold text-neutral-900 tracking-tight">File Management</h3>
        <p className="text-sm text-neutral-500 font-medium mt-1">Manage all source documents attached to this project.</p>
      </div>
      
      <div className="flex flex-col flex-1 divide-y divide-neutral-100 bg-white">
        {files.map((file) => (
          <div key={file.id} className="p-4 sm:px-6 flex items-center justify-between group hover:bg-neutral-50/80 transition-colors">
            <div className="flex items-center gap-4">
              <div className="bg-red-50 text-red-500 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-red-100/50 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-neutral-900 text-sm group-hover:text-primary-600 transition-colors cursor-pointer">{file.name}</span>
                <span className="text-xs text-neutral-500 font-medium mt-0.5">
                  {file.size} • <span className="text-neutral-400">{file.date}</span>
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="success" className="bg-green-50 text-green-700 hover:bg-green-100 px-2.5 py-1 uppercase tracking-wider font-bold border-none hidden sm:inline-flex text-[10px]">
                {file.status}
              </Badge>
              
              {/* Action Buttons visible on hover */}
              <div className="flex items-center space-x-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
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
