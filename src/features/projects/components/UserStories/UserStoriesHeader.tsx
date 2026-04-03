import { Button } from "@/components/ui/Button/Button";
import { Badge } from "@/components/ui/Badge/Badge";
import { Filter, Upload, FileText } from "lucide-react";

export const UserStoriesHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-primary-50 to-indigo-50 border border-primary-100/50 flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900">
              User Stories
            </h2>
            <Badge variant="primary" size="sm" className="font-bold">
              3 Stories
            </Badge>
          </div>
          <p className="text-sm text-neutral-500 font-medium max-w-2xl leading-relaxed">
            Structured requirements extracted by AI Requra. Review, verify, and
            refine the core value propositions for the upcoming sprint.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <Button
          variant="outline"
          className="h-10 px-5 rounded-xl border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300 shadow-sm font-semibold transition-all text-sm"
        >
          <Filter className="mr-2 h-3.5 w-3.5 text-neutral-400" />
          Filter
        </Button>
        <Button
          variant="default"
          className="h-10 px-5 rounded-xl bg-linear-to-b from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-md shadow-primary-500/20 font-bold border-none transition-all text-sm"
        >
          <Upload className="mr-2 h-3.5 w-3.5" />
          Export
        </Button>
      </div>
    </div>
  );
};
