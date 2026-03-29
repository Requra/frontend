import { Badge } from "@/components/ui/Badge/Badge";
import { Button } from "@/components/ui/Button/Button";
import { Share2, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { paths } from "@/routes/paths";

export const ProjectHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb Navigation */}
      <button 
        onClick={() => navigate(paths.app.projects.root)}
        className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors w-fit group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Projects
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 mb-2">
            CRM System Project
          </h1>
          <div className="flex items-center gap-3">
            <Badge
              variant="success"
            >
              COMPLETED
            </Badge>
            <span className="text-sm font-medium text-neutral-500">Last updated 1m ago</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="h-11 px-5 rounded-xl border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 shadow-sm font-semibold transition-all"
          >
            <Share2 className="mr-2 h-4 w-4 text-neutral-500" />
            Share Project
          </Button>
          <Button 
            variant="default" 
            className="h-11 px-6 rounded-xl bg-linear-to-b from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-md shadow-primary-500/20 font-bold border-none transition-all"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Finalize Report
          </Button>
        </div>
      </div>
    </div>
  );
};
