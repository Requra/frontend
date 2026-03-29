import { Badge } from "@/components/ui/Badge/Badge";
import { Button } from "@/components/ui/Button/Button";
import {
  Share2,
  CheckCircle,
  ArrowLeft,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { paths } from "@/routes/paths";

export const ProjectHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={() => navigate(paths.app.projects.root)}
          className="flex items-center gap-1.5 text-neutral-400 hover:text-neutral-700 transition-colors group font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          Projects
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
        <span className="text-neutral-700 font-semibold">
          CRM System Project
        </span>
      </div>

      {/* Title Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
            CRM System Project
          </h1>
          <div className="flex items-center gap-3">
            <Badge variant="success" size="default">
              <CheckCircle className="w-3 h-3 mr-1" />
              COMPLETED
            </Badge>
            <span className="flex items-center gap-1.5 text-xs font-medium text-neutral-400">
              <Clock className="w-3 h-3" />
              Updated 1m ago
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="outline"
            className="h-10 px-5 rounded-xl border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300 shadow-sm font-semibold transition-all text-sm"
          >
            <Share2 className="mr-2 h-3.5 w-3.5" />
            Share
          </Button>
          <Button
            variant="default"
            className="h-10 px-5 rounded-xl bg-linear-to-b from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-md shadow-primary-500/20 font-bold border-none transition-all text-sm"
          >
            <CheckCircle className="mr-2 h-3.5 w-3.5" />
            Finalize Report
          </Button>
        </div>
      </div>
    </div>
  );
};
