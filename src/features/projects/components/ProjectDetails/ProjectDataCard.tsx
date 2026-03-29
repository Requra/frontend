import { Card } from "@/components/ui/Card/Card";
import { Badge } from "@/components/ui/Badge/Badge";
import { Avatar } from "@/components/ui/Avatar/Avatar";
import { User, Calendar, Activity, Tag, Database } from "lucide-react";

export const ProjectDataCard = () => {
  return (
    <Card className="p-6 bg-white border border-neutral-200/60 shadow-sm">
      <h3 className="font-bold text-neutral-900 mb-6 flex items-center gap-2">
        <Database className="w-4 h-4 text-primary-600" />
        Project Metadata
      </h3>

      <div className="flex flex-col gap-6">
        {/* Owner */}
        <div>
          <span className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium mb-3">
            <User className="w-3.5 h-3.5" />
            Owner
          </span>
          <div className="flex items-center gap-3 bg-neutral-50/80 p-2.5 rounded-xl border border-neutral-100 transition-colors hover:bg-neutral-100/50">
            <Avatar fallback="HA" />
            <span className="font-semibold text-neutral-900 text-sm">
              Hassan Abdelhamed
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Date Created */}
          <div>
            <span className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium mb-2">
              <Calendar className="w-3.5 h-3.5" />
              Date Created
            </span>
            <span className="text-sm font-bold text-neutral-900 px-1">
              Oct 10, 2025
            </span>
          </div>

          {/* Status */}
          <div>
            <span className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium mb-2">
              <Activity className="w-3.5 h-3.5" />
              Status
            </span>
            <span className="text-sm font-bold text-green-600 px-1">
              Complete
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="pt-2">
          <span className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium mb-3">
            <Tag className="w-3.5 h-3.5" />
            Tags
          </span>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-primary-50 text-primary-700 hover:bg-primary-100/80 rounded-md border border-primary-100/50 font-semibold px-2.5 py-1 transition-colors">
              Fintech
            </Badge>
            <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100/80 rounded-md border border-blue-100/50 font-semibold px-2.5 py-1 transition-colors">
              Architecture
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};
