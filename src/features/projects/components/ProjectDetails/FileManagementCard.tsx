import { Card } from "@/components/ui/Card/Card";
import { Badge } from "@/components/ui/Badge/Badge";
import { FileText } from "lucide-react";

export const FileManagementCard = () => {
  const files = [
    {
      id: 1,
      name: "Core_Banking_Specs.pdf",
      size: "12.4 MB",
      date: "Verified Oct 24",
      status: "Processed & Verified",
    },
    {
      id: 2,
      name: "Core_Banking_Specs.pdf",
      size: "12.4 MB",
      date: "Verified Oct 24",
      status: "Processed & Verified",
    },
  ];

  return (
    <div className="flex flex-col gap-4 mt-8">
      <h3 className="text-xl font-bold text-neutral-900 mb-2">File Management</h3>
      
      {files.map((file) => (
        <Card key={file.id} className="p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-red-50 text-red-500 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-neutral-900 text-sm">{file.name}</span>
              <span className="text-xs text-neutral-500 mt-0.5">
                {file.size} • {file.date}
              </span>
            </div>
          </div>
          <Badge variant="success" className="bg-green-100 text-green-700 hover:bg-green-100/80 px-3 py-1 font-bold">
            {file.status}
          </Badge>
        </Card>
      ))}
    </div>
  );
};
