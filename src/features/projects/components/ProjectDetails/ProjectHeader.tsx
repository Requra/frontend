import { Badge } from "@/components/ui/Badge/Badge";
import { Button } from "@/components/ui/Button/Button";
import { Share2, CheckCircle } from "lucide-react";

export const ProjectHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          CRM System Project
        </h1>
        <div className="flex items-center gap-3">
          <Badge
            variant="primary"
            className="bg-blue-50 text-blue-500 rounded-full font-semibold border-none"
          >
            IN PROGRESS
          </Badge>
          <span className="text-sm text-neutral-500">Last updated 1m ago</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share Project
        </Button>
        <Button variant="default" className="text-white">
          <CheckCircle className="mr-2 h-4 w-4" />
          Finalize Report
        </Button>
      </div>
    </div>
  );
};
