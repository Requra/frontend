import { Card } from "@/components/ui/Card/Card";
import { Badge } from "@/components/ui/Badge/Badge";
import { Avatar } from "@/components/ui/Avatar/Avatar";
import {
  User,
  Calendar,
  Activity,
  Tag,
  Database,
  ExternalLink,
} from "lucide-react";

const MetaField = ({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <span className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-bold mb-2.5 uppercase tracking-wider">
      <Icon className="w-3 h-3" />
      {label}
    </span>
    {children}
  </div>
);

export const ProjectDataCard = () => {
  return (
    <Card className="p-6 bg-white border border-neutral-200/60 shadow-sm relative overflow-hidden">
      {/* Decorative corner */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary-50/40 rounded-full blur-2xl pointer-events-none" />

      <h3 className="font-bold text-neutral-900 mb-6 flex items-center gap-2 relative">
        <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
          <Database className="w-3.5 h-3.5 text-primary-600" />
        </div>
        Project Metadata
      </h3>

      <div className="flex flex-col gap-6 relative">
        {/* Owner */}
        <MetaField icon={User} label="Owner">
          <div className="flex items-center gap-3 bg-neutral-50/80 p-3 rounded-xl border border-neutral-100 transition-all hover:bg-neutral-100/50 hover:border-neutral-200/80 cursor-pointer group">
            <Avatar fallback="HA" />
            <div className="flex flex-col flex-1">
              <span className="font-semibold text-neutral-900 text-sm">
                Hassan Abdelhamed
              </span>
              <span className="text-[10px] text-neutral-400 font-medium">
                Project Admin
              </span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </MetaField>

        {/* Date + Status row */}
        <div className="flex items-start justify-between gap-4">
          <MetaField icon={Calendar} label="Created">
            <span className="text-sm font-bold text-neutral-900">
              Oct 10, 2025
            </span>
          </MetaField>

          <MetaField icon={Activity} label="Status">
            <Badge variant="success" size="sm" className="font-bold">
              Complete
            </Badge>
          </MetaField>
        </div>

        {/* Tags */}
        <MetaField icon={Tag} label="Tags">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="primary"
              className="rounded-lg border border-primary-100/50 px-2.5 py-1 transition-colors"
            >
              Fintech
            </Badge>
            <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100/80 rounded-lg border border-blue-100/50 px-2.5 py-1 transition-colors">
              Architecture
            </Badge>
          </div>
        </MetaField>
      </div>
    </Card>
  );
};
