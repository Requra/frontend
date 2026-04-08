import { useState } from "react";
import { Card } from "@/components/ui/Card/Card";
import { Badge } from "@/components/ui/Badge/Badge";
import {
  CircleCheckBig,
  AlertTriangle,
  ListChecks,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserStory } from "../types";
import { UserStoryStatus, UserStoryPriority } from "../types";
import { CardActions } from "./CardActions";
import { AcceptanceCriteria } from "./AcceptanceCriteria";
import { CommentsSection } from "./CommentsSection";

/* ───── Config maps ───── */

const STATUS_LABELS: Record<UserStoryStatus, string> = {
  [UserStoryStatus.Draft]: "Draft",
  [UserStoryStatus.Approved]: "Approved",
  [UserStoryStatus.InProgress]: "In Progress",
  [UserStoryStatus.Rejected]: "Rejected",
};

const STATUS_VARIANT: Record<UserStoryStatus, "extracted" | "verified" | "flagged"> = {
  [UserStoryStatus.Draft]: "extracted",
  [UserStoryStatus.Approved]: "verified",
  [UserStoryStatus.InProgress]: "extracted",
  [UserStoryStatus.Rejected]: "flagged",
};

const ACCENT_GRADIENT: Record<UserStoryStatus, string> = {
  [UserStoryStatus.Draft]: "bg-linear-to-r from-cyan-400 to-cyan-500",
  [UserStoryStatus.Approved]: "bg-linear-to-r from-indigo-400 to-indigo-500",
  [UserStoryStatus.InProgress]: "bg-linear-to-r from-primary-400 to-primary-500",
  [UserStoryStatus.Rejected]: "bg-linear-to-r from-orange-400 to-orange-500",
};

const PRIORITY_CONFIG: Record<UserStoryPriority, { label: string; className: string }> = {
  [UserStoryPriority.low]:      { label: "Low",      className: "bg-neutral-50 text-neutral-500 border-neutral-200" },
  [UserStoryPriority.medium]:   { label: "Medium",   className: "bg-blue-50 text-blue-600 border-blue-200" },
  [UserStoryPriority.high]:     { label: "High",     className: "bg-orange-50 text-orange-600 border-orange-200" },
  [UserStoryPriority.critical]: { label: "Critical", className: "bg-red-50 text-red-600 border-red-200" },
};

/* ───── Helpers ───── */

/** Formats large numbers: 1234 → "1.2K", 1234567 → "1.2M" */
function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

/* ───── Props ───── */

interface UserStoryCardProps extends UserStory {
  /** 1-based index used to generate the display ID (US-01, US-02, ...) */
  displayIndex: number;
}

/* ───── Component ───── */

export const UserStoryCard = ({
  status,
  title,
  description,
  priority,
  acceptanceCriteria,
  comments,
  totalComments,
  displayIndex,
}: UserStoryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isVerified = status === UserStoryStatus.Approved;
  const isFlagged = status === UserStoryStatus.Rejected;
  const priorityCfg = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG[UserStoryPriority.medium];
  const displayId = `US-${String(displayIndex).padStart(2, "0")}`;
  const criteriaCount = acceptanceCriteria?.length ?? 0;
  const commentsCount = totalComments ?? comments?.length ?? 0;

  return (
    <Card
      className={cn(
        "p-0 flex flex-col transition-all duration-300 group relative overflow-hidden",
        "hover:shadow-lg hover:-translate-y-0.5",
        isFlagged && "border-orange-200/60",
      )}
    >
      {/* Top accent line */}
      <div className={cn("absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl", ACCENT_GRADIENT[status])} />

      {/* ─── Compact card body ─── */}
      <div className="flex flex-col gap-3 p-5 pt-6">
        {/* Header — identifier + priority + status */}
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-bold text-neutral-800 tracking-tight">
              {displayId}
            </span>
            <span
              className={cn(
                "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border leading-none inline-flex items-center gap-1",
                priorityCfg.className,
              )}
            >
              {priority === UserStoryPriority.critical && <AlertTriangle className="w-2.5 h-2.5" />}
              {priorityCfg.label}
            </span>
          </div>
          <Badge variant={STATUS_VARIANT[status]} size="sm">
            {isVerified && <CircleCheckBig className="w-3 h-3 mr-1" />}
            {STATUS_LABELS[status]}
          </Badge>
        </div>

        {/* Title + description */}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-sm font-semibold text-neutral-800 leading-snug line-clamp-2">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-neutral-500 italic border-l-2 border-neutral-100 pl-2.5 line-clamp-1">
              {description}
            </p>
          )}
        </div>

        {/* ─── Compact stats bar ─── */}
        <div className="flex items-center gap-4 pt-1">
          {criteriaCount > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <ListChecks className="w-3.5 h-3.5 text-success-500" />
              <span className="font-semibold">{criteriaCount}</span>
              <span className="text-neutral-400">
                {criteriaCount === 1 ? "criterion" : "criteria"}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <MessageSquare className="w-3.5 h-3.5 text-primary-400" />
            <span className="font-semibold">{formatCount(commentsCount)}</span>
            <span className="text-neutral-400">
              {commentsCount === 1 ? "comment" : "comments"}
            </span>
          </div>
        </div>
      </div>

      {/* ─── Expand toggle + footer ─── */}
      <div className="border-t border-neutral-100">
        {/* Expand/Collapse button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded((prev) => !prev);
          }}
          className={cn(
            "w-full flex items-center justify-center gap-1.5 py-2 text-[11px] font-semibold transition-colors cursor-pointer",
            isExpanded
              ? "text-primary-600 bg-primary-50/40 hover:bg-primary-50/70"
              : "text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50/80",
          )}
        >
          {isExpanded ? "Hide details" : "View details"}
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 transition-transform duration-300",
              isExpanded && "rotate-180",
            )}
          />
        </button>

        {/* ─── Expanded detail panel ─── */}
        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out",
            isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-4 px-5 pb-5 pt-3 border-t border-neutral-100 bg-neutral-50/30">
              {/* Acceptance Criteria */}
              {criteriaCount > 0 && (
                <AcceptanceCriteria criteria={acceptanceCriteria} />
              )}

              {/* Comments */}
              <CommentsSection comments={comments || []} totalComments={commentsCount} />
            </div>
          </div>
        </div>

        {/* Actions row */}
        <div className="flex items-center justify-between px-5 py-3 bg-neutral-50/30 border-t border-neutral-100">
          <span className="text-[10px] font-semibold text-neutral-400">
            {displayId}
          </span>
          <CardActions isVerified={isVerified} />
        </div>
      </div>
    </Card>
  );
};
