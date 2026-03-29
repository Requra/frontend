import { Card } from "@/components/ui/Card/Card";
import { Badge } from "@/components/ui/Badge/Badge";
import { Avatar } from "@/components/ui/Avatar/Avatar";

export const ProjectDataCard = () => {
  return (
    <Card className="p-6 bg-primary-50/50 border-none shadow-none">
      <h3 className="font-bold text-neutral-900 mb-6">Project Data</h3>

      <div className="flex flex-col gap-6">
        {/* Owner */}
        <div>
          <span className="text-xs text-neutral-500 font-medium mb-2 block">
            Owner
          </span>
          <div className="flex items-center gap-3">
            <Avatar fallback="HA" />
            <span className="font-semibold text-neutral-900 text-sm">
              Hassan Abdelhamed
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Date Created */}
          <div>
            <span className="text-xs text-neutral-500 font-medium mb-1 block">
              Date Created
            </span>
            <span className="text-sm font-bold text-neutral-900">
              Oct 10, 2025
            </span>
          </div>

          {/* Status */}
          <div>
            <span className="text-xs text-neutral-500 font-medium mb-1 block">
              Status
            </span>
            <span className="text-sm font-bold text-green-600">
              Complete
            </span>
          </div>
        </div>

        {/* Tags */}
        <div>
          <span className="text-xs text-neutral-500 font-medium mb-2 block">
            Tags
          </span>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-primary-100 text-primary-700 hover:bg-primary-200/80 rounded-md border-none font-semibold px-2">
              Fintech
            </Badge>
            <Badge className="bg-primary-100 text-primary-700 hover:bg-primary-200/80 rounded-md border-none font-semibold px-2">
              Fintech
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};
