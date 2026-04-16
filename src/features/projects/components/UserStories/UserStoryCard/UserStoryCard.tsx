import { Card } from "@/components/ui/Card/Card";
import { Badge } from "@/components/ui/Badge/Badge";
import { CircleCheckBig } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserStory } from "../types";
import { UserStoryStatus } from "../types";
import { QualityScore } from "./QualityScore";
import { CardActions } from "./CardActions";

/** Status Labels for UI display */
const STATUS_LABELS: Record<UserStoryStatus, string> = {
  [UserStoryStatus.Draft]: "Draft",
  [UserStoryStatus.Approved]: "Approved",
  [UserStoryStatus.InProgress]: "In Progress",
  [UserStoryStatus.Rejected]: "Rejected",
};

/** Map story status → Badge variant */
const STATUS_VARIANT: Record<UserStoryStatus, "extracted" | "verified" | "flagged"> =
  {
    [UserStoryStatus.Draft]: "extracted",
    [UserStoryStatus.Approved]: "verified",
    [UserStoryStatus.InProgress]: "extracted",
    [UserStoryStatus.Rejected]: "flagged",
  };

/** Gradient accent per status */
const ACCENT_GRADIENT: Record<UserStoryStatus, string> = {
  [UserStoryStatus.Draft]: "bg-linear-to-r from-cyan-400 to-cyan-500",
  [UserStoryStatus.Approved]: "bg-linear-to-r from-indigo-400 to-indigo-500",
  [UserStoryStatus.InProgress]: "bg-linear-to-r from-primary-400 to-primary-500",
  [UserStoryStatus.Rejected]: "bg-linear-to-r from-orange-400 to-orange-500",
};

export const UserStoryCard = ({
  id,
  status,
  title,
  description,
  qualityScore,
}: UserStory) => {
  const isVerified = status === UserStoryStatus.Approved;
  const isFlagged = status === UserStoryStatus.Rejected;

  return (
    <Card
      className={cn(
        "p-6 flex flex-col gap-5 transition-all duration-300 h-full group relative overflow-hidden",
        "hover:shadow-lg hover:-translate-y-0.5",
        isFlagged && "border-orange-200/60"
      )}
    >
      {/* Top accent line */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl",
          ACCENT_GRADIENT[status]
        )}
      />

      {/* Header — identifier + status badge */}
      <div className="flex justify-between items-start">
        <div>
          <span className="block text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
            Identifier
          </span>
          <span className="text-lg font-bold text-neutral-800">{id}</span>
        </div>
        <Badge variant={STATUS_VARIANT[status]} size="lg">
          {isVerified && <CircleCheckBig className="w-3 h-3 mr-1" />}
          {STATUS_LABELS[status]}
        </Badge>
      </div>

      {/* Narrative */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-neutral-800 leading-relaxed">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-neutral-500 italic border-l-2 border-neutral-100 pl-3 py-0.5">
            {description}
          </p>
        )}
      </div>

      {/* Footer — quality score + actions */}
      <div className="flex items-center justify-between border-t border-neutral-100 pt-4 mt-auto">
        <QualityScore score={qualityScore} />
        <CardActions isVerified={isVerified} />
      </div>
    </Card>
  );
};
